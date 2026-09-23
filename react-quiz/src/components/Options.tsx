import type { Dispatch } from "react"
import type { Questions } from "../types/Questions"
import type { Action } from "../types/Action"

interface OptionsProps{
    options: Questions["options"],
    answer: null | number,
    dispatch : Dispatch<Action>
}

export function Options({ options, answer, dispatch }: OptionsProps) {
    const hasAnswered = answer !== null;
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