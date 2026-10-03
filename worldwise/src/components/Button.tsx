import type { PropsWithChildren } from "react";
import style from './Button.module.css'


export function Button({onClick, type, children}: PropsWithChildren<{
    onClick?: () => void;
    type: string;
}>){
    return(
        <button 
            className={`${style.btn} ${style[type]}`}
            // Without an onClick the button falls back to submitting its form
            onClick={onClick ? (e)=>{
                e.preventDefault();
                onClick()
            } : undefined}
        >
            {children}
        </button>
    )
}