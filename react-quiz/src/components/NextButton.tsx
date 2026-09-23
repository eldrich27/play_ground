import type { Dispatch } from "react"
import type { Action } from "../types/Action"

interface NextButtonProps {
    dispatch: Dispatch<Action>,
    answer: null | number,
    index: number,
    numQuestions: number
}

function NextButton({ dispatch, answer, index, numQuestions }: NextButtonProps) {
    const hasAnswered = answer !== null

    if (!hasAnswered) return null

    if (index < numQuestions - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
            >
                Next
            </button>
        )
    }

    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finishTest" })}
        >
            Finish
        </button>
    )
}

export default NextButton
