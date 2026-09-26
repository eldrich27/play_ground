import type { Cities } from "../types/Cities"
import style from "./CityList.module.css"

import { CityItem } from "./CityItem"
import Spinner from "./Spinner"

interface CityListProps{
    cities :Cities[],
    isLoading: boolean
}

export function CityList({cities, isLoading}:CityListProps){
    if(isLoading) return <Spinner />

    return(
        <ul className={style.cityList}>
            {cities.map((city) => (
                <CityItem key={city.id} city={city} />
            ))}
        </ul>
    )
}