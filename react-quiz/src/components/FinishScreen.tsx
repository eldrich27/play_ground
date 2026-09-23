interface FinishScreenProps{
    points: number,
    maxPoints:number
}

export function FinishScreen({points, maxPoints}:FinishScreenProps) {
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
            <p className="highscore">HighScore : X Points</p>
        </>
    );
}