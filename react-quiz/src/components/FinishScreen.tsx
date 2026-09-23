

export function FinishScreen() {
    // const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
        <p className="result">
            You have scored {"X"} of {"Y"} ({"Z"}%)
        </p>
    );
}