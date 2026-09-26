import type { Cities } from "../types/Cities"
import style from "./CityList.module.css"

import { CityItem } from "./CityItem"
import Spinner from "./Spinner"
import Message from "./Message"

interface CityListProps{
    cities :Cities[],
    isLoading: boolean
}

export function CityList({cities, isLoading}:CityListProps){
    if(isLoading) return <Spinner />

    if (!cities.length) return <Message message="No Cities Found! Add your first city by clicking on the map" />

    return(
        <ul className={style.cityList}>
            {cities.map((city) => (
                <CityItem key={city.id} city={city} />
            ))}
        </ul>
    )
}