import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getTheoryCards } from '../api/TheoryCardsService';
import Formula from './Formula';
import './FormulaList.css';
import { connect } from 'react-redux';

function FormulaList(props){    

    let navigate = useNavigate(); 
    const [formulas, setFormulas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      async function fetchData(){
          var test = await getTheoryCards(props.token);
          setFormulas(test);
          setIsLoading(true);
      }
      fetchData();
    },[]);

    return(
      <div className="formulalist">
        {isLoading && formulas.map((formula) => (
          <Formula formula={formula}/>
        ))}
      </div>
    );
}

const mapStateToProps = (state) => {
  return{
      userLogged: state.userLoggedIn,
      token: state.token
  }
}

export default connect(mapStateToProps, null) (FormulaList);