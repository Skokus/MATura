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
            <div className="tips-tip"><MathJax>{props.tips[tipNumber]}</MathJax></div>
            <button className="tips-button" onClick={changeTip}>Następna wskazówka</button>
        </div>
    );
}
  
export default TipBox;