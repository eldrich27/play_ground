import type { Dispatch } from "react"
import type { Questions } from "../types/Questions"
import type { Action } from "../types/Action"

interface OptionsProps{
    options: Questions["options"],
    answer: null | number,
    correctOption: number,
    dispatch : Dispatch<Action>
}

export function Options({ options, answer, correctOption, dispatch }: OptionsProps) {
    const hasAnswered = answer !== null;
    return(
        <div className="options">
            {options.map((option, index) => (
                <button 
                    className={`btn btn-option ${(index === answer )? 'answer': ''}
                    ${hasAnswered ?
                        index === correctOption ? 'correct' : 'wrong'
                        : ''
                    }
                    `}
                    key={option}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                    disabled = {hasAnswered}
                >
                    {option}
                </button>
            ))}
      </div>
    )
}