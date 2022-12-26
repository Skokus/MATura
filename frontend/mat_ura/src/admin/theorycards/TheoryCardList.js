import React, { useState, useEffect, useContext } from 'react';
import { getTheoryCards } from '../../api/TheoryCardsService';
import { useNavigate } from "react-router-dom";
import "../../styles/forms.css"

function TheoryCardList(){

    const [theorycards, setTheoryCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            var c = await getTheoryCards();
            setTheoryCards(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div>
            <button className="form-button create-button" onClick={() => navigate("/admin/categories/add")}>Dodaj fiszkę</button>
            <table>
                <tr>
                    <th>Id fiszki</th>
                    <th>Opis</th>
                    <th></th>
                </tr>
            {isLoading && theorycards.map((tc) => (
                <tr>
                    <td>{tc.id}</td>
                    <td>{tc.description}</td>
                    <td><button className="form-button delete-button" onClick={() => console.log(tc.id)}>Usuń</button></td>
                </tr>
            ))}
            </table>
        </div>
    );

}

export default TheoryCardList;