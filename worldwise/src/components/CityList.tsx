import type { Cities } from "../types/Cities"
import style from "./CityList.module.css"

interface CityListProps{
    cities :Cities[],
    isLoading: boolean
}

export function CityList({cities, isLoading}:CityListProps){
    // if(!isLoading) return <Spinner />

    return(
        
        <ul className={style.cityList}>
            {cities.map((city)=>{
                <CityItem city= {city}, key={city.id}/>
            })}
        </ul>
    )
}