import React, { useState } from 'react';
import "./answerinput.css"

function AnswerInput(props){
    const [answer, setAnswer] = useState(0);

    function handleChange(event){    
        setAnswer(event.target.value);  
    }

    return(
        <div>
            {!props.abcanswers && <input className="answer-input-text" type="text" onChange={handleChange}></input>}
            {props.abcanswers && props.abcanswers.map((ans,index) => (<label><input className="answer-input-radio" name={"step" + props.idx} type="radio" value={ans} onChange={handleChange}></input>{ans}</label>))}
            <button className="answer-input-button" onClick={() => props.handleClick(answer)}>Sprawdź</button>
        </div>
    );
}

export default AnswerInput;