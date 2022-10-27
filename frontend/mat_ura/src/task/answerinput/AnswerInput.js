import React, { useState } from 'react';
import "./answerinput.css"

function AnswerInput(props){
    const [answer, setAnswer] = useState(0);

    function handleChange(event){    
        setAnswer(event.target.value);  
    }

    return(
        <div>
            <input className="answer-input-text" type="text" onChange={handleChange}></input>
            <button className="answer-input-button" onClick={() => props.handleClick(answer)}>Sprawdź</button>
        </div>
    );
}

export default AnswerInput;