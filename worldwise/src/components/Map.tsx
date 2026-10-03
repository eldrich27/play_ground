import { useEffect, useState } from "react"

import { useSearchParams, useNavigate } from "react-router-dom"
import { useMap, useMapEvents } from "react-leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import style from "./Map.module.css"
import { Button } from "./Button"
import { useGeolocation } from "../hooks/useGeolocation"
import { useCities } from "../context/CityContext"
import { convertToEmoji } from "../utils/convertToEmoji"

const DEFAULT_CENTER: [number, number] = [28.6, 77.22];


export default function Map(){
    const { cities } = useCities();

    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    // Remember the last selected city so the map stays there when the URL no longer has lat/lng
    const [mapCenter, setMapCenter] = useState<[number, number]>(() =>
        lat && lng ? [parseFloat(lat), parseFloat(lng)] : DEFAULT_CENTER
    );

    useEffect(() => {
        if (lat && lng) setMapCenter([parseFloat(lat), parseFloat(lng)]);
    }, [lat, lng]);

    const {
        position: geoPosition,
        isLoading: isLoadingPosition,
        error: geoError,
        getPosition,
    } = useGeolocation();

    // Move the map to the user's location once the browser gives it to us
    useEffect(() => {
        if (geoPosition) setMapCenter([geoPosition.lat, geoPosition.lng]);
    }, [geoPosition]);

    useEffect(() => {
        if (geoError) alert(geoError);
    }, [geoError]);

    return(
        <div className={style.mapContainer} >
            {!geoPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}
            <MapContainer
                className={style.map}
                center={mapCenter}
                zoom={7}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        key={city.id}
                        position={[city.position.lat, city.position.lng]}
                    >
                        {/* Map.module.css styles the first span as the flag */}
                        <Popup>
                            <span>{convertToEmoji(city.emoji)}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                {geoPosition && (
                    <Marker position={[geoPosition.lat, geoPosition.lng]}>
                        <Popup>📍 Your current location</Popup>
                    </Marker>
                )}
                <ChangeMapCenter position={mapCenter} />
                <MapClickHandler />
            </MapContainer>
        </div>
    )
}


function ChangeMapCenter({ position }: { position: [number, number] }) {
    const map = useMap();
    const [lat, lng] = position;

    useEffect(() => {
        map.setView([lat, lng]);
    }, [map, lat, lng]);

    return null;
}

function MapClickHandler() {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => {
            
            const { lat, lng } = e.latlng;
            navigate(`/app/form?lat=${lat}&lng=${lng}`);
        }
    });
    return null;
}
