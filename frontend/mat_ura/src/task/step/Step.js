import "./step.css"
import React, {useState} from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { IoLockClosed} from 'react-icons/io5'
import { MathJax } from 'better-react-mathjax';
import AnswerInput from "../answerinput/AnswerInput";

function Step(props) {
  
  const [answer, setAnswer] = useState(0);

  function determineStepContent(){
    switch(props.completion){
      case "done":
        return <IoCheckmark className="checkmark"/>;
      case "beingDone":
        return <MathJax>{props.step.content}</MathJax>;
      case "basic":
        return <IoLockClosed className="lock"/>;
    }
  }

  function handleChange(event){    
      setAnswer(event.target.value); 
  }
    
  async function checkAnswer(e){
    e.preventDefault();
    props.handleAnswer(answer);
  }

  return (
    <div className={"stepclass " + props.completion}>
      {determineStepContent()}
      {props.completion === "beingDone" && 
        <form onSubmit={checkAnswer}>
          {!props.step.abcAnswers && <input className="step-form-input-text" type="text" onChange={handleChange}></input>}
          {props.step.abcAnswers && props.step.abcAnswers.map((ans,index) => (<label className="step-form-radio-label"><input className="step-form-radio" name={"step" + props.idx} type="radio" value={ans} onChange={handleChange}></input><MathJax>{ans}</MathJax></label>))}
          <br></br>
          <button className="step-form-button">Sprawdź</button>
        </form>
      }
    </div>
  );
}

export default Step;