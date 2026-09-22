import { type ChangeEvent, useReducer, useState } from "react";

type CounterState = {
  count: number;
  step: number;
};

type CounterAction =
  | { type: 'inc_num' }
  | { type: 'dec_num' }
  | { type: 'progress'; step: number }
  | { type: 'set_count'; count: number }
  | { type: 'reset' };

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'inc_num':{
      return {
        ...state,
        count: state.count + state.step
      }
    }
    case 'dec_num':{
      return {
        ...state,
        count: state.count - state.step
      }
    }
    case 'progress': {
      return {
        ...state,
        step: action.step
      }
    }
    case 'set_count': {
      return {
        ...state,
        count: action.count
      }
    }
    case 'reset': {
      return initialState;
    }
    default:
      throw Error("Unknown action"); 
  }
    
}

const initialState = {count:0, step:1}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);


  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={state.step ? state.step +1 :state.step}
          onChange={(e)=>dispatch({ type: "progress", step: Number(e.target.value) })}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={() =>{dispatch({ type: 'dec_num' })}}>-</button>
        <input
          value={state.count}
          onChange={(e) => dispatch({ type: 'set_count', count: Number(e.target.value) })}
        />
        <button onClick={() =>{dispatch({ type: 'inc_num' })}}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() =>{dispatch({ type: 'reset' })}}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
