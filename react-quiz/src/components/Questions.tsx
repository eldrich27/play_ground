import type { Dispatch } from "react";
import type { Questions } from "../types/Questions";
import { Options } from "./Options";
import type { Action } from "../types/Action";

interface QuestionsProps {
    question : Questions,
    answer : null | number,
    dispatch : Dispatch<Action>
}

function Question({ question, answer, dispatch }: QuestionsProps) {

  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        answer = {answer}
        correctOption = {question.correctOption}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Question;
