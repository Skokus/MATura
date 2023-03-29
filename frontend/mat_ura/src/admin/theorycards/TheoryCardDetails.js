import React, { useState, useEffect } from 'react';
import { getTheoryCard } from '../../api/TheoryCardsService';
import {useParams, useNavigate } from "react-router-dom";
import "../detailsstyle.css"
import { MathJax } from 'better-react-mathjax';
import Photo from '../../photo/Photo'
import { connect } from 'react-redux';

function TheoryCardDetails(props){

    const [theorycard, setTheorycard] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {theoryCardId} = useParams();
    
    useEffect(() => {
        async function fetchData(){
            var t = await getTheoryCard(props.token, theoryCardId);
            setTheorycard(t);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div>
            {isLoading && (<div className="details">
                <div className="details-header">Szczegóły fiszki: {theorycard.id}</div>
                <div className="details-param">Opis: <div className="details-param-value">{theorycard.description}</div></div>
                <div className="details-param">Tag: <div className="details-param-value">{theorycard.tag}</div></div>
                <div className="details-param">Treść:  <div className="details-param-value"><MathJax>{theorycard.cardsContent}</MathJax></div></div>
                {theorycard.image && <Photo image={theorycard.image}/>}
            </div>)}
        </div>
    );

}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
  }
  
export default connect(mapStateToProps, null) (TheoryCardDetails);