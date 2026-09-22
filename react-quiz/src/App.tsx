// import DateCounter from "./components/DateCounter"
import Main from "./components/Main"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Progress from "./components/Progress"

function App() {

  return (
    <div className="app">
      <Header />
      <Main>
        <Progress />
      </Main>
    </div>
  )
}

export default App
