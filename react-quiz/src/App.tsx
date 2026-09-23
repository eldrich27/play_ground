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

type State = {
  questions: Questions[]
  status: "loading" | "ready" | "error" | "active" | "finished",
  index: number
}

type Action =
  | { type: "dataReceived"; payload: Questions[] }
  | { type: "ready" }
  | { type: "start_quiz" }
  | { type: "error" }

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0
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
    case "start_quiz":
      return {
        ...state,
        status: "active"
      }
    default:
      throw new Error("action not supported")
  }
}

function App() {

  const [{status, questions, index}, dispatch] = useReducer(reducer, initialState)

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
        console.log(data[0])
      } catch {
        console.error("Unable to load data")
        hasError = true
        dispatch({type : "error"})
      } 
    }
    getQuestions("http://localhost:3031/questions")
  },[])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading"&& <Loader />}
        {status === "ready" && <StartScreen numQuestions={numQuestion} dispatch={dispatch} />}
        {status === "error" && <ErrorMessage/>}
        {status === "active" &&
        <>
          <Progress></Progress>
          <Question question={questions[index]}/>
        </>
        }
      </Main>

    </div>
  )
}

export default App
