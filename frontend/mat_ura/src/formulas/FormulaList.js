import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getTheoryCards } from '../api/TheoryCardsService';
import Formula from './Formula';
import './FormulaList.css';

function FormulaList(props){    

    let navigate = useNavigate(); 
    const [formulas, setFormulas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
      JSON.parse(localStorage.getItem("token"))
    );

    useEffect(() => {
      async function fetchData(){
          var test = await getTheoryCards(token);
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
export default FormulaList;