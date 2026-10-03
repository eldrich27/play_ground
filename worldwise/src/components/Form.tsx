import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Message from "./Message";
import Spinner from "./Spinner";
import { convertToEmoji, convertToEmoji2 } from "../utils/convertToEmoji";


const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client?"

function Form() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string>("");
  const { lat, lng } = useUrlLocation();

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

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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

      <div className={styles.buttons}>
        <Button type="primary" >Add</Button>
        <Button type="back" onClick={() => navigate(-1)}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
