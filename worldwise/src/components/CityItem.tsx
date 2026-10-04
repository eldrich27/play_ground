import style from "./CityItem.module.css"
import { Link } from "react-router-dom";
import { useState, type MouseEvent } from "react";
import type { Cities } from "../types/Cities";
import { formatDate } from "../utils/formatDate";
import { convertToEmoji } from "../utils/convertToEmoji";
import { useCities } from "../context/CityContext";


interface CityItemProps{
    city: Cities
}

export function CityItem({city}:CityItemProps){
    const {lat, lng} = city.position
    const { deleteCity, currentCity } = useCities();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // currentCity is a single city in the context, so at most one item is ever active.
    // It stays set after leaving the city view, so the last opened city stays highlighted.
    const isActive = currentCity?.id === city.id;

    async function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        // The button sits inside the Link, so stop the click from opening the city
        e.preventDefault();
        e.stopPropagation();

        try {
            setIsDeleting(true);
            // On success the city is removed from the list, so this item unmounts
            await deleteCity(city.id);
        } catch (error) {
            console.error(`Error deleting city with id ${city.id}:`, error);
            alert(error instanceof Error ? error.message : "Could not delete the city.");
            setIsDeleting(false);
        }
    }

    return(
        <li >
            <Link
                className={`${style.cityItem} ${isActive ? style["cityItem--active"] : ""} ${isDeleting ? style.deleting : ""}`}
                aria-current={isActive ? "true" : undefined}
                aria-busy={isDeleting}
                to={`${city.id}?lat=${lat}&lng=${lng}`}
            >
                <span className={style.emoji}>{convertToEmoji(city.emoji)}</span>
                <p className={style.name}>{city.cityName}</p>
                <time className={style.date} dateTime={city.date}>{formatDate(city.date)}</time>
                {isDeleting ? (
                    <span className={style.deleteSpinner} role="status" aria-label={`Deleting ${city.cityName}`} />
                ) : (
                    <button
                        type="button"
                        className={style.deleteBtn}
                        onClick={handleDelete}
                        aria-label={`Delete ${city.cityName}`}
                    >
                        &times;
                    </button>
                )}
            </Link>
        </li>
    )
}
