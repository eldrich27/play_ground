import { useReducer } from "react"

// import DateCounter from "./components/DateCounter"
import Main from "./components/Main"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Progress from "./components/Progress"
import StartScreen from "./components/StartQuiz"
import Question from "./components/Questions"

const initialState = {numQuestion:0, maxPoints:10}

function reducer(){
  return null
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="app">
      <Header />
      <Main>
        <Progress />
        <StartScreen dispatch = {dispatch}/>
      </Main>

    </div>
  )
}

export default App
