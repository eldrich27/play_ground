

import type { Dispatch } from "react";

function StartScreen({ dispatch }: { dispatch: Dispatch<{ type: string }> }) {

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{15} questions to test your React mastery</h3>
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