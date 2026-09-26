import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import type { Cities } from "../types/Cities";

import type { Country } from "../types/Country";


interface CountryListProps{
  cities: Cities[];
  isLoading: boolean;
}

function CountryList({cities,isLoading}: CountryListProps) {
  const countries = cities.reduce<Country[]>((arr, city) => {
    if (!arr.some((el) => el.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="No Cities Found! Add your first city by clicking on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
