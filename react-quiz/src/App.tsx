import { useEffect, useReducer } from "react"

// import DateCounter from "./components/DateCounter"
import Main from "./components/Main"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Progress from "./components/Progress"
import StartScreen from "./components/StartScreen"
import Question from "./components/Questions"
import ErrorMessage from "./components/Error"

import type { Questions } from "./types/Questions"
import type { Action } from "./types/Action"
import { FinishScreen } from "./components/FinishScreen"

type State = {
  questions: Questions[]
  status: "loading" | "ready" | "error" | "active" | "finished",
  index: number
  answer : number | null
  points : number
}

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer : null,
  points:0
}

function reducer(state: State, action: Action): State {
  switch (action.type){
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status : "ready"
      }
    
    case "error": {
      return {
        ...state,
        status : "error"
      }
    }
    case "start_quiz":{
      return {
        ...state,
        status: "active"
      }
    }
    case "newAnswer":{
      const question = state.questions[state.index]
      return {
        ...state,
        answer: action.payload,
        points: 
          action.payload === question.correctOption ?
          state.points + question.points : state.points

      }
    }
    case "nextQuestion":{
    
      return {
        ...state,
        index: state.index +1,
        answer: null
      }
    }
    case "finishTest":{
    
      return {
        ...state,
        status: "finished"
      }
    }
    case "reset":{
      return {
        ...initialState,
        questions: state.questions,
        status: "ready"
      }
    }
    default:
      throw new Error("action not supported")
  }
}

function App() {

  const [{status, questions, answer, index, points}, dispatch] = useReducer(reducer, initialState)

  const numQuestion = questions?.length

  useEffect(()=>{

    async function getQuestions(uri:string){
      let hasError = false
      try {
        const res = await fetch(uri)
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }
        const data = await res.json()
        dispatch({type : "dataReceived", payload : data})
        // console.log(data[0])
      } catch {
        console.error("Unable to load data")
        hasError = true
        dispatch({type : "error"})
      } 
    }
    getQuestions("http://localhost:3031/questions")
  },[])


  const maxPoints = questions?.reduce((acc,cur_val)=>{
    return acc + cur_val?.points
  },0)


  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading"&& <Loader />}
        {status === "ready" && <StartScreen numQuestions={numQuestion} dispatch={dispatch} />}
        {status === "error" && <ErrorMessage/>}
        {status === "active" &&
        <>
          <Progress numQuestions={numQuestion} points={points} index={index} maxPoints={maxPoints}/>
          <Question
            question={questions[index]}
            answer = {answer}
            index={index}
            dispatch={dispatch}
          />
        </>
        }
        {status === "finished" && 
        <FinishScreen 
          points={points} 
          maxPoints={maxPoints}
          dispatch={dispatch}
        />}
      </Main>

    </div>
  )
}

export default App
