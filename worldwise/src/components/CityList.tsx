import style from "./CityList.module.css"

import { CityItem } from "./CityItem"
import Spinner from "./Spinner"
import Message from "./Message"
import { useCities } from "../context/CityContext"



export function CityList(){
    // using useCity hook to use the cities context provider
    const {cities , isLoading} = useCities()

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