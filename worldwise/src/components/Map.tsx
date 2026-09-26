import { useSearchParams } from "react-router-dom"
import style from "./Map.module.css"


export default function Map(){
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng')

    return(
        <div className={style.mapContainer}>
            <h1>Welcome from Maps!</h1>
            <h2>Positions</h2>
            <h4>lat : {lat}</h4>
            <h4>lng : {lng}</h4>
            <button
            onClick={()=>{
                setSearchParams({lat :'50.555', lng:'35.2727'})
            }}
            > 
            Set New Param
            </button>
        </div>
    )
}