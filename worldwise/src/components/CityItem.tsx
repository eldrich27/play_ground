import style from "./CityItem.module.css"

import type { Cities } from "../types/Cities";


interface CityItemProps{
    city: Cities
}


export function CityItem({city}:CityItemProps){
 return(
    <li className={style.cityItem}>
        <span>{city.emoji}</span>
        <p>{city.cityName}</p>
    </li>
 )
}