import React, { useState } from 'react';
import "./answerinput.css"
import { MathJax } from 'better-react-mathjax';

function AnswerInput(props){
    const [answer, setAnswer] = useState(0);

    function handleChange(event){    
        setAnswer(event.target.value);
        console.log(props.abcAnswers);  
    }

    return(
        <div>
            {!props.abcAnswers && <input className="answer-input-text" type="text" onChange={handleChange}></input>}
            {props.abcAnswers && props.abcAnswers.map((ans,index) => (<label  className="answer-input-radio-label"><input className="answer-input-radio" name={"step" + props.idx} type="radio" value={ans} onChange={handleChange}></input><MathJax>{ans}</MathJax></label>))}
            <br></br>
            <button className="answer-input-button" onClick={() => props.handleClick(answer)}>Sprawdź</button>
        </div>
    );
}

export default AnswerInput;