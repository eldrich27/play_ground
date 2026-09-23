import type { Dispatch } from "react";
import type { Action } from "../types/Action";



function StartScreen({numQuestions, dispatch}:{ numQuestions : number ,dispatch : Dispatch<Action> }) {

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start_quiz" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;