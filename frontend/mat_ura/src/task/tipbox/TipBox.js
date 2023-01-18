import React, { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import "./TipBox.css"

function TipBox(props) {
  
    const [tipNumber, setTipNumber] = useState(0);
    
    function changeTip(){
        var n = tipNumber + 1;
        setTipNumber(n % props.tips.length);
    }

    return (
        <div className="tips">
            <div className="tips-header">Wskazówki</div>
            <button className="tips-button" onClick={changeTip}>Następna wskazówka</button>
            <div className="tips-tip"><MathJax>{props.tips[tipNumber].content}</MathJax></div>
        </div>
    );
}
  
export default TipBox;