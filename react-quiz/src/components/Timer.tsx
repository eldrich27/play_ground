import { useEffect } from "react"
import type { Dispatch } from "react"
import type { Action } from "../types/Action"

interface TimerProps {
    secondsRemaining: number,
    dispatch: Dispatch<Action>
}

function Timer({ secondsRemaining, dispatch }: TimerProps) {
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: "tick" })
        }, 1000)

        return () => clearInterval(id)
    }, [dispatch])

    const minutes = Math.floor(secondsRemaining / 60)
    const seconds = secondsRemaining % 60

    return (
        <p className="timer">
            {minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}
        </p>
    )
}

export default Timer
