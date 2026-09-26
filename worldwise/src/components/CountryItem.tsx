import styles from "./CountryItem.module.css";
import type { Country } from "../types/Country";
import { convertToEmoji } from "../utils/convertToEmoji";

interface CountryItemProps {
  country: Country;
}

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{convertToEmoji(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
