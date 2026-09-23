import type { Questions } from "../types/Questions";

interface QuestionsProps {
    question : Questions
}

function Question({ question }: QuestionsProps) {

  return (
    <div>
      <h4>{question.question}</h4>
    </div>
  );
}

export default Question;
