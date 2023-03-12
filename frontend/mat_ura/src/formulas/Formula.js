import React, { useEffect, useState } from 'react';
import "./Formula.css"
import { MathJax } from 'better-react-mathjax';
import Photo from '../photo/Photo';
function Formula(props){    

  const [isOpen, setIsOpen] = useState(false);
  
  return(
    <div className="formula">
      <div className="formula-description-bg" onClick={() => setIsOpen(!isOpen)}>
        <div className="formula-description">{props.formula.description}</div>
      </div>
      {isOpen && <div className="formula-content">
        <div className="formula-content-el"><MathJax>{props.formula.cardsContent}</MathJax></div>
        {props.formula.image && <div className="formula-content-el"><Photo image={props.formula.image}/></div>}
      </div>}
    </div>
  );
}
export default Formula;