import { useParams } from "react-router-dom"


export function City(){
    const { id } = useParams<{ id: string }>()
    return(
        <div>
            <h2>City {id}</h2>
        </div>
    )
}