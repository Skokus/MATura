import React, { useState, useEffect, useContext } from 'react';
import { getTheoryCard } from '../../api/TheoryCardsService';
import {useParams, useNavigate } from "react-router-dom";
import "../../styles/forms.css"
import { MathJax } from 'better-react-mathjax';
import Photo from '../../photo/Photo'

function TheoryCardDetails(){

    const [theorycard, setTheorycard] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();
    const {theoryCardId} = useParams();
    
    useEffect(() => {
        async function fetchData(){
            var t = await getTheoryCard(theoryCardId);
            setTheorycard(t);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div>
            {isLoading && (<div className="details-page">
                <div className="details-header">Szczegóły fiszki {theorycard.id}</div>
                <div className="details-param">Opis: {theorycard.description}</div>
                <div className="details-param">Tag: {theorycard.tag}</div>
                <div className="details-param">Treść: <MathJax>{theorycard.cardsContent}</MathJax></div>
                {theorycard.image && <Photo image={theorycard.image}/>}
            </div>)}
        </div>
    );

}

export default TheoryCardDetails;