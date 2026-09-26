import { useParams, useSearchParams } from "react-router-dom"


export function City(){
    const { id } = useParams<{ id: string }>()

    const [searchParams, setSearchParam] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return(
        <div>
            <h2>City {id}</h2>
            {lat && <p>lat : {lat}</p>}
            {lng && <p>lng : {lng}</p>}
            <button
            onClick={()=>{
                setSearchParam({lat :'22.777', lng:'21.777'})
            }}
            > 
            Set Param
            </button>
        </div>
    )
}