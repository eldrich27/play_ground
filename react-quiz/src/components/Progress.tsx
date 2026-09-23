

interface ProgressProps{
  numQuestions: number,
  points: number, 
  index : number,
  maxPoints : number
}

function Progress({numQuestions, points, index, maxPoints}:ProgressProps) {
//   const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  return (
    <div className="progress">
      <progress max={numQuestions} value={index} />

      <p>
        Question <strong>{index+1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </div>
  );
}

export default Progress;