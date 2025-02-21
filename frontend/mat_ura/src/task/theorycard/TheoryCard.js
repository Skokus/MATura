import React, { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import "./TheoryCard.css"
import Photo from '../../photo/Photo';

function TheoryCard(props) {
  
    const [cardNumber, setCardNumber] = useState(0);
    
    function changeCard(){
        var n = cardNumber + 1;
        setCardNumber(n % props.theorycards.length);
    }

    return (
        <div className="theorycards">
            <div className="theorycards-header">Wzory</div>
            <button className="theorycards-button" onClick={changeCard}>Następny wzór</button>
            <div className="theorycards-content"><MathJax>{props.theorycards[cardNumber].cardsContent}</MathJax></div>
            {props.theorycards[cardNumber].image && <div className="theorycards-image"><Photo image={props.theorycards[cardNumber].image}/></div>}
        </div>
    );
}
  
export default TheoryCard;