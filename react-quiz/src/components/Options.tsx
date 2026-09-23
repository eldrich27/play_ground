import type { Dispatch } from "react"
import type { Questions } from "../types/Questions"
import type { Action } from "../types/Action"

interface OptionsProps{
    options: Questions["options"],
    answer: null | number,
    correctOption: number,
    index: number,
    dispatch : Dispatch<Action>
}

export function Options({ options, answer, correctOption,index, dispatch }: OptionsProps) {
    const hasAnswered = answer !== null;
    return(
        <>
        <div className="options">
            {options.map((option, indx) => (
                <button 
                    className={`btn btn-option ${(indx === answer )? 'answer': ''}
                    ${hasAnswered ?
                        indx === correctOption ? 'correct' : 
                        indx== answer ?'wrong' : ''
                        : ''
                    }
                    `}
                    key={option}
                    onClick={() => dispatch({ type: "newAnswer", payload: indx })}
                    disabled = {hasAnswered}
                >
                    {option}
                </button>
            ))}
            
      </div>
      {hasAnswered && 
       index <= 14 ? 
        <button className="btn btn-ui"
            onClick={()=>{dispatch({ type:"nextQuestion"})}}
        >
            Next
        </button>
        :  <button className="btn btn-ui"
            onClick={()=>{dispatch({ type:"finishTest"})}}
        >
            Finish
        </button>
    }
      
      </>
    )
}