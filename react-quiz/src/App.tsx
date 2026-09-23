import { useEffect, useReducer } from "react"

// import DateCounter from "./components/DateCounter"
import Main from "./components/Main"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Progress from "./components/Progress"
import StartScreen from "./components/StartScreen"
import Question from "./components/Questions"
import ErrorMessage from "./components/Error"
import Timer from "./components/Timer"
import Footer from "./components/Footer"
import NextButton from "./components/NextButton"

import type { Questions } from "./types/Questions"
import type { Action } from "./types/Action"
import { FinishScreen } from "./components/FinishScreen"

const SECONDS_PER_QUESTION = 20

type State = {
  questions: Questions[]
  status: "loading" | "ready" | "error" | "active" | "finished",
  index: number
  answer : number | null
  points : number
  highscore : number
  secondsRemaining : number | null
}

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer : null,
  points:0,
  highscore:0,
  secondsRemaining: null
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
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
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
        status: "finished",
        highscore: Math.max(state.points, state.highscore)
      }
    }
    case "reset":{
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready"
      }
    }
    case "tick":{
      const secondsRemaining = (state.secondsRemaining ?? 0) - 1
      return {
        ...state,
        secondsRemaining,
        status: secondsRemaining <= 0 ? "finished" : state.status,
        highscore: secondsRemaining <= 0 ? Math.max(state.points, state.highscore) : state.highscore
      }
    }
    default:
      throw new Error("action not supported")
  }
}

function App() {

  const [{status, questions, answer, index, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState)

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
            dispatch={dispatch}
          />
          <Footer>
            {typeof secondsRemaining === "number" &&
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            }
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestion} />
          </Footer>
        </>
        }
        {status === "finished" && 
        <FinishScreen
          points={points}
          maxPoints={maxPoints}
          highscore={highscore}
          dispatch={dispatch}
        />}
      </Main>

    </div>
  )
}

export default App
