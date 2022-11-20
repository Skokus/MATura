import React from 'react';
import { MathJax } from 'better-react-mathjax';
import "./Solution.css"

function Solution(props) {
  
    return (
        <div className="solution">
            <div className="solution-header">Rozwiązanie</div>
            <MathJax className="solution-content">{props.currentsolution}</MathJax>
        </div>
    );
}
  
export default Solution;