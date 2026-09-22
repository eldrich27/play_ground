

function Progress() {
//   const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={15} value={1} />

      <p>
        Question <strong>{1}</strong> / {15}
      </p>

      <p>
        <strong>{0}</strong> / {250}
      </p>
    </header>
  );
}

export default Progress;