import type { PropsWithChildren } from "react";
import style from './Button.module.css'


export function Button({onClick, type, children}: PropsWithChildren<{
    onClick: () => void;
    type: string;
}>){
    return(
        <button 
            className={style[type]}
            onClick={(e)=>{
                e.preventDefault();
                onClick()
            }}
        >
            {children}
        </button>
    )
}