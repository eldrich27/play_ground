import { useEffect, useReducer } from "react"

// import DateCounter from "./components/DateCounter"
import Main from "./components/Main"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Progress from "./components/Progress"
import StartScreen from "./components/StartQuiz"
import Question from "./components/Questions"
import ErrorMessage from "./components/Error"

type State = {
  questions: unknown[]
  status: "loading" | "ready" | "error" | "active" | "finished"
}

type Action =
  | { type: "dataReceived"; payload: unknown[] }
  | { type: "ready" }
  | { type: "error" }

const initialState: State = {
  questions: [],
  status: "loading"
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
    default:
      throw new Error("action not supported")
  }
}

function App() {

  const [{status, questions}, dispatch] = useReducer(reducer, initialState)

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
        {status === "ready" && 
          <>
          <Progress />
          <StartScreen dispatch = {(action) => dispatch(action as Action)}/>
          </>
        }
        {status === "error" && <ErrorMessage/>}
      </Main>

    </div>
  )
}

export default App
