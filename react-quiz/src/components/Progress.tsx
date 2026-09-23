

interface ProgressProps{
  numQuestions: number,
  points: number
}

function Progress({numQuestions, points}:ProgressProps) {
//   const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  return (
    <div className="progress">
      <progress max={numQuestions} value={1} />

      <p>
        Question <strong>{1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {250}
      </p>
    </div>
  );
}

export default Progress;