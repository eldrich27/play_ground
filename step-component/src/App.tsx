
import { useState } from "react";
import "./index.css"

const messages:string[] = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  // Using states
  const [step, setStep] = useState(1);

  // Handle the next step
  function handleNext() {
    if (step >= 3) return;
    setStep((s) => s + 1);
  };

  // Handle the previous step
  function handlePrev() {
    if (step <= 1) return;
    setStep((s) => s - 1);
  };


  return (
    <>
      <button className="close" onClick={() => setStep(1)}>&times;</button>
      <div className="steps">
        <div className="numbers">
          <div className={`${step >= 1 && 'active'}`}>1</div>
          <div className={`${step >= 2 && 'active'}`}>2</div>
          <div className={`${step >= 3 && 'active'}`}>3</div>
          
        </div>
        <p className="message">Step {step} : {messages[step - 1]}</p>
        <div className="buttons">
          <button style={{ backgroundColor: '#7950f2', color: 'white' }} onClick={handlePrev}>
            Previous
          </button>
          <button style={{ backgroundColor: '#7950f2', color: 'white' }} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}