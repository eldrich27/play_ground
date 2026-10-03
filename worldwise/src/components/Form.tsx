import { useEffect, useState, type SubmitEvent } from "react";

import styles from "./Form.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Message from "./Message";
import Spinner from "./Spinner";
import { convertToEmoji, convertToEmoji2 } from "../utils/convertToEmoji";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../context/CityContext";


const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client?"

function Form() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addError, setAddError] = useState<string>("");
  const { lat, lng } = useUrlLocation();
  const { addCity } = useCities();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const response = await fetch(`${Base_Url}latitude=${lat}&longitude=${lng}`);
        if (!response.ok) {
          throw new Error("Could not fetch data for this location.");
        }
        const data = await response.json();

        const city = data.city || data.locality;
        if (!city || !data.countryName || !data.countryCode) {
          throw new Error("That doesn't seem to be a city. Click somewhere else 😉");
        }
        setCityName(city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji2(data.countryCode));
        setDate(new Date());
      } catch (error) {
        console.error("Error fetching city data:", error);
        setGeocodingError(
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching city data."
        );
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();
  },[lat, lng]);

  //handle form submission
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cityName.trim() || !date || !lat || !lng) {
      setAddError("Please enter a city name and a date.");
      return;
    }

    try {
      setIsAdding(true);
      setAddError("");
      await addCity({
        cityName: cityName.trim(),
        country,
        emoji,
        date: date.toISOString(),
        notes: notes.trim(),
        position: { lat: Number(lat), lng: Number(lng) },
      });
      navigate("/app/cities");
    } catch (error) {
      setAddError(
        error instanceof Error ? error.message : "Could not add the city."
      );
    } finally {
      setIsAdding(false);
    }
  };

  // Conditional rendering based on the state of geocoding
  if (isLoadingGeocoding) return <Spinner />;

  // Display error message if geocoding failed
  if (geocodingError) return <Message message={geocodingError} />;

  // Display a message if lat or lng is not available
  if (!lat || !lng) return <Message message="Start by clicking somewhere on the map 🌍" />;

  return (
    <form
      className={`${styles.form} ${isAdding ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {emoji && <span className={styles.flag}>{convertToEmoji(emoji)}</span>}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date: Date | null) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          showIcon
          toggleCalendarOnIconClick
          calendarIconClassName={styles.calendarIcon}
        />
      </div>
      

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          rows={4}
          placeholder="What did you see, eat or love about it?"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      {addError && <p className={styles.error}>{addError}</p>}

      <div className={styles.buttons}>
        <Button type="primary">{isAdding ? "Adding..." : "Add"}</Button>
        <Button type="back" onClick={() => navigate("/app/cities")}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
