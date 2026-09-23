import type { Dispatch } from "react";
import type { Action } from "../types/Action";

interface FinishScreenProps{
    points: number,
    maxPoints:number
    highscore: number
    dispatch: Dispatch<Action>
}

export function FinishScreen({points, maxPoints, highscore, dispatch}:FinishScreenProps) {
    const percentage = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0;
    const emoji = percentage === 100 ? "🏆" 
    : percentage >= 80 ? "🎉" 
    : percentage >= 60 ? "😊" 
    : percentage >= 40 ? "🙂" 
    : "😔";
    

    return (
        <>
            <p className="result">
                {emoji} You have scored {points} of {maxPoints} ({percentage}%)
            </p>
            <p className="highscore">HighScore : {highscore} Points</p>
            <button 
                className="btn btn-ui"
                onClick={()=>{dispatch({type:"reset"})}}
            >
                Reset
            </button>
        </>
    );
}