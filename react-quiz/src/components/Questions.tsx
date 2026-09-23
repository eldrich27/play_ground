import type { Questions } from "../types/Questions";
import { Options } from "./Options";

interface QuestionsProps {
    question : Questions
}

function Question({ question }: QuestionsProps) {

  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </div>
  );
}

export default Question;
