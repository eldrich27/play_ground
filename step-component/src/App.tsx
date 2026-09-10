import "./index.css"

export default function App() {
  return (
    <div className="steps">
      <div className="numbers">
        <div className="circle">1</div>
        <div className="circle">2</div>
        <div className="circle">3</div>
      </div>
      <p className="message">Step 2 : Some message</p>
      <div className="buttons">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  )
}