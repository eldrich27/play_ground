import type { Dispatch } from "react"
import type { Questions } from "../types/Questions"

interface OptionsProps{
    options: Questions["options"]
    dispatch : Dispatch<{type: "newAnswer"}>
}

export function Options({ options, dispatch }: OptionsProps) {
    return(
        <div className="options">
            {options.map((option) => (
                <button 
                    className="btn btn-option" 
                    key={option}
                    onClick={() => dispatch({ type: "newAnswer" })}
                >
                    {option}
                </button>
            ))}
      </div>
    )
}