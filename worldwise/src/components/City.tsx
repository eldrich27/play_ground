import style from "./City.module.css"

import { useParams } from "react-router-dom"
import { useCities } from "../context/CityContext"
import { formatDate } from "../utils/formatDate"
import { convertToEmoji } from "../utils/convertToEmoji"
import Spinner from "./Spinner"
import Message from "./Message"


export function City(){
    const { id } = useParams<{ id: string }>()
    const { cities, isLoading } = useCities()

    if (isLoading) return <Spinner />

    // id from the URL is a string, while the ids in the data are numbers
    const city = cities.find((city) => city.id === Number(id))

    if (!city) return <Message message="City not found" />

    const { cityName, emoji, date, notes } = city

    return(
        <div className={style.city}>
            <div className={style.row}>
                <h6>City name</h6>
                <h3>
                    <span>{convertToEmoji(emoji)}</span> {cityName}
                </h3>
            </div>

            <div className={style.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date)}</p>
            </div>

            {notes && (
                <div className={style.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}
        </div>
    )
}
