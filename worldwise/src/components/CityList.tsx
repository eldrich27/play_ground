import style from "./CityList.module.css"



export function CityList(){
    return(
        <ul className={style.cityList}>
            <li> List 1</li>
            <li> List 2</li>
            <li> List 3</li>
        </ul>
    )
}