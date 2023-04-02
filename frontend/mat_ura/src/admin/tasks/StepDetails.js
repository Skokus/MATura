import { MathJax } from 'better-react-mathjax';
import React, {useState} from 'react';
import Photo from '../../photo/Photo';

function StepDetails(props) {

  const [isActive, setIsActive] = useState(false);

  return (
    <div className="stepdetails">
      <div className="stepdetails-header" onClick={() => setIsActive(!isActive)}><MathJax>{props.step.content}</MathJax></div>
      {isActive && <div>
        <div className="details-param">Odpowiedź</div><div className="details-param-value"><MathJax>{props.step.answer}</MathJax></div>
        <div className="details-param">Obecny stan rozwiązania</div><div className="details-param-value"><MathJax>{props.step.currentSolution}</MathJax></div>  
        {props.step.image && <div className="details-param-value"><Photo image={props.step.image}/></div>}
        <div className="details-param">Odpowiedzi testowe</div>
        {props.step.abcAnswers && props.step.abcAnswers.map((el) => (
          <div className="details-param-value"><MathJax>{el}</MathJax></div>
        ))}
      </div>}
    </div>
  );
}

export default StepDetails;