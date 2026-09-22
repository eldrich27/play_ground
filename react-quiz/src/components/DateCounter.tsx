import { type ChangeEvent, useReducer, useState } from "react";

function reducer(state, action){
  switch (action.type) {
    case 'inc_num':{
      return {
        count: state.count + 1
      }
    }
    case 'dec_num':{
      return {
        count: state.count - 1
      }
    }
  }
  throw Error("Unknown Action: " + action.type)
}


let initialState = {count:0, step:1}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    setCount((count) => count - step);
  };

  const inc = function () {
    // setCount((count) => count + 1);
    setCount((count) => count + step);
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    setCount(Number(e.target.value));
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() =>{dispatch({ type: 'dec_num' })}}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={() =>{dispatch({ type: 'inc_num' })}}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
