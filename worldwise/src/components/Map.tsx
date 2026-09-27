import { useSearchParams, useNavigate } from "react-router-dom"
import style from "./Map.module.css"


export default function Map(){
    const navigate = useNavigate()
    

    return(
        <div className={style.mapContainer} onClick={()=>{navigate('form')}}>
            <h1>Welcome from Maps!</h1>
        </div>
    )
}