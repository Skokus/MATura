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
    
  return (
    <div className={"stepclass " + props.completion}>
      {determineStepContent()}
      {props.completion === "beingDone" && 
        <div>
          {!props.step.abcAnswers && <input className="answer-input-text" type="text" onChange={handleChange}></input>}
          {props.step.abcAnswers && props.step.abcAnswers.map((ans,index) => (<label className="answer-input-radio-label"><input className="answer-input-radio" name={"step" + props.idx} type="radio" value={ans} onChange={handleChange}></input><MathJax>{ans}</MathJax></label>))}
          <br></br>
          <button className="answer-input-button" onClick={() => props.handleAnswer(answer)}>Sprawdź</button>
        </div>
      }
    </div>
  );
}

export default Step;