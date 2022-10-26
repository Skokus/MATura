import "./step.css"
import React from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { IoLockClosed} from 'react-icons/io5'

function Step(props) {
  function checkAnswer(a){
    if(this.state.step.answer == a){
        this.changeCompletion();
    }
  }

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
    </div>
  );
}

export default Step;