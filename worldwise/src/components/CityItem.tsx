import style from "./CityItem.module.css"
import { Link } from "react-router-dom";
import type { Cities } from "../types/Cities";
import { formatDate } from "../utils/formatDate";
import { convertToEmoji } from "../utils/convertToEmoji";


interface CityItemProps{
    city: Cities
}


export function CityItem({city}:CityItemProps){
    const {lat, lng} = city.position
  
    return(
        <li >
            <Link 
                className={style.cityItem} 
                to={`${city.id}?lat=${lat}&lng=${lng}`}
            >
                <span className={style.emoji}>{convertToEmoji(city.emoji)}</span>
                <p className={style.name}>{city.cityName}</p>
                <time className={style.date} dateTime={city.date}>{formatDate(city.date)}</time>
                <button className={style.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}
