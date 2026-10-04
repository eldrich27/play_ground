import style from "./City.module.css"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCities } from "../context/CityContext"
import { formatDate } from "../utils/formatDate"
import { convertToEmoji } from "../utils/convertToEmoji"
import Spinner from "./Spinner"
import Message from "./Message"
import { Button } from "./Button"


export function City(){
    const { id } = useParams<{ id: string }>()
    const { currentCity, getCity, isLoading } = useCities()
    const navigate = useNavigate()
    // Remember which city the error belongs to, so it disappears when another city is opened
    const [error, setError] = useState<{ id: number; message: string } | null>(null)

    // id from the URL is a string, while the ids in the data are numbers
    const cityId = Number(id)

    // Fetch the city whenever the id in the URL changes. getCity is wrapped in
    // useCallback in the context, so listing it here doesn't re-run the effect every render.
    useEffect(() => {
        const controller = new AbortController()

        getCity(cityId, controller.signal).catch((err) => {
            setError({
                id: cityId,
                message: err instanceof Error ? err.message : "City not found",
            })
        })

        // Cancel the request if the user opens another city before this one loads
        return () => controller.abort()
    }, [cityId, getCity])

    if (error?.id === cityId) return <Message message={error.message} />

    // Also wait while currentCity is still the previously opened city
    if (isLoading || currentCity?.id !== cityId) return <Spinner />

    const { cityName, emoji, date, notes } = currentCity

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
            <Button type="back" onClick={()=>{navigate("/app/cities")}} >&larr; Back to all cities</Button>
        </div>
    )
}
