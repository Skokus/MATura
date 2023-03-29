import React, { useState, useEffect } from 'react';
import { deleteTip, getTips } from '../../api/TipService';
import { useNavigate } from "react-router-dom";
import "../liststyle.css"
import { connect } from 'react-redux';

function TipList(props){

    const [tips, setTips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            const c = await getTips(props.token);
            setTips(c);
        }
        fetchData();
    },[]);

    const onDeleteButtonClicked = async (id) => {
        await deleteTip(props.token, id);
        const copy = tips.filter(tip => tip.id != id);
        setTips(copy);
    }

    return(
        <div className="list">
            <div className="list-header">Wskazówki</div>
            <button className="list-button create-button" onClick={() => navigate("/admin/tips/new")}>Dodaj wskazówkę</button>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nazwa</th>
                    <th>Zawartość</th>
                    <th></th>
                    <th></th>
                </tr>
            {tips.map((t) => (
                <tr>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.content}</td>
                    <td><button className="list-button edit-button" onClick={() => navigate("/admin/tips/" + t.id + "/edit")}>Edytuj</button></td>
                    <td><button className="list-button delete-button" onClick={() => onDeleteButtonClicked(t.id)}>Usuń</button></td>
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

export default connect(mapStateToProps, null) (TipList);