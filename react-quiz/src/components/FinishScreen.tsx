interface FinishScreenProps{
    points: number,
    maxPoints:number
}

export function FinishScreen({points, maxPoints}:FinishScreenProps) {
    const percentage = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0;

    return (
        <p className="result">
            You have scored {points} of {maxPoints} ({percentage}%)
        </p>
    );
}