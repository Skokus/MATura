import "./step.css"
import React from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { IoLockClosed} from 'react-icons/io5'
import AnswerInput from "../answerinput/AnswerInput";

function Step(props) {

  function determineStepContent(){
    switch(props.completion){
      case "done":
        return <IoCheckmark className="checkmark"/>;
      case "beingDone":
        return props.step.content;
      case "basic":
        return <IoLockClosed className="lock"/>;
    }
  }

  return (
    <div className={"stepclass " + props.completion}>
      {determineStepContent()}
      {props.completion === "beingDone" && <AnswerInput id="answerInput" handleClick={props.handleAnswer}/>}
    </div>
  );
}

export default Step;