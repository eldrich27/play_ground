import style from "./CityItem.module.css"

import type { Cities } from "../types/Cities";


interface CityItemProps{
    city: Cities
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}

// Windows has no flag emoji glyphs, so turn "🇵🇹" into "pt" and show an image instead
function flagEmojiToPNG(flag: string){
    const countryCode = Array.from(flag, (char) =>
        String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase()
    ).join("");

    return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt={`${countryCode} flag`} />
}


export function CityItem({city}:CityItemProps){
 return(
    <li className={style.cityItem}>
        <span className={style.emoji}>{flagEmojiToPNG(city.emoji)}</span>
        <p className={style.name}>{city.cityName}</p>
        <time className={style.date} dateTime={city.date}>{formatDate(city.date)}</time>
    </li>
 )
}
