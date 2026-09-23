import { useEffect, useReducer } from "react"

// import DateCounter from "./components/DateCounter"
import Main from "./components/Main"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Progress from "./components/Progress"
import StartScreen from "./components/StartQuiz"
import Question from "./components/Questions"

const initialState = {
  questions : [],
  status : "loading"
}

function reducer(state, action){
  switch (action.type){
    case "ready":{
      return{
        ...state,
        status : "ready"
      }
    }
    case "error": {
      return {
        ...state,
        status : "error"
      }
    }
  }
  return null
}

function App() {

  const [{status, questions}, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{

    async function getQuestions(uri:string){
      try {
        const res = await fetch(uri)
        const data = await res.json()
        dispatch({type : "dataReceived", payload : data})
        console.log(data[0])
      } catch {
        console.error(Error("Unable to load data"))
        dispatch({type : "error"})
      }
      finally {
        dispatch({ type: "ready" })
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
          <StartScreen dispatch = {dispatch}/>
          </>
        }
      </Main>

    </div>
  )
}

export default App
