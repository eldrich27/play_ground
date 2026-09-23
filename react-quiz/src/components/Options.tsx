import type { Dispatch } from "react"
import type { Questions } from "../types/Questions"
import type { Action } from "../types/Action"

interface OptionsProps{
    options: Questions["options"]
    dispatch : Dispatch<Action>
}

export function Options({ options, dispatch }: OptionsProps) {
    return(
        <div className="options">
            {options.map((option, index) => (
                <button 
                    className="btn btn-option" 
                    key={option}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >
                    {option}
                </button>
            ))}
      </div>
    )
}