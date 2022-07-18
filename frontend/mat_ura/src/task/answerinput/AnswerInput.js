import React, { useState } from 'react';
import "./answerinput.css"

function AnswerInput(props){
    const [answer, setAnswer] = useState(0);

    function handleChange(event){    
        setAnswer(event.target.value);  
    }

    return(
        <div id="bottom">
            <input type="text" onChange={handleChange}></input>
            <button onClick={() => props.handleClick(answer)}>Check Answer</button>
        </div>
    );
}

export default AnswerInput;