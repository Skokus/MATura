import React from 'react';
import { MathJax } from 'better-react-mathjax';
import "./Solution.css"
import Photo from '../../photo/Photo';

function Solution(props) {
  
    return (
        <div className="solution">
            <div className="solution-header">Rozwiązanie</div>
            <MathJax className="solution-content">{props.currentsolution}</MathJax>
            {props.image && <div className="solution-image"><Photo image={props.image}/></div>}
        </div>
    );
}
  
export default Solution;