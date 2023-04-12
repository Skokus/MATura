import React, { useState, useEffect, useContext } from 'react';
import { deleteTheoryCard, getTheoryCards } from '../../api/TheoryCardsService';
import { useNavigate } from "react-router-dom";
import "../liststyle.css"
import { connect } from 'react-redux';

function TheoryCardList(props){

    const [theorycards, setTheoryCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            var c = await getTheoryCards(props.token);
            setTheoryCards(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    const onDeleteButtonClicked = async (id) => {
        await deleteTheoryCard(props.token, id);
        const copy = theorycards.filter(theorycard => theorycard.id != id);
        setTheoryCards(copy);
    }

    return(
        <div className="list">
            <div className="list-header">Wzory</div>
            <button className="list-button create-button" onClick={() => navigate("/admin/theory-cards/new")}>Dodaj fiszkę</button>
            <table>
                <tr>
                    <th>Id fiszki</th>
                    <th>Opis</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            {isLoading && theorycards.map((tc) => (
                <tr>
                    <td>{tc.id}</td>
                    <td>{tc.description}</td>
                    <td><button className="list-button details-button" onClick={() => navigate("/admin/theory-cards/" + tc.id)}>Szczegóły</button></td>
                    <td><button className="list-button edit-button" onClick={() => navigate("/admin/theory-cards/" + tc.id + "/edit")}>Edytuj</button></td>
                    <td><button className="list-button delete-button" onClick={() => onDeleteButtonClicked(tc.id)}>Usuń</button></td>
                </tr>
            ))}
            </table>
        </div>
    );

}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
}
  
export default connect(mapStateToProps, null) (TheoryCardList);