import "./step.css"
import React from 'react';

function Step(props) {
  function checkAnswer(a){
    if(this.state.answer == a){
        this.changeCompletion();
    }
  }

  return (
    <div className={"stepclass " + props.completion}>
      {props.stepContent}
    </div>
  );
}

export default Step;