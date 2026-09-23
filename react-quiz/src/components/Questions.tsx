import type { Dispatch } from "react";
import type { Questions } from "../types/Questions";
import { Options } from "./Options";

interface QuestionsProps {
    question : Questions
    dispatch :Dispatch<{type: "newAnswer"}>
}

function Question({ question, dispatch }: QuestionsProps) {

  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} dispatch={dispatch} />
    </div>
  );
}

export default Question;
