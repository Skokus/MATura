import React, { useState, useEffect, useContext } from 'react';
import { deleteTip, getTips } from '../../api/TipService';
import { useNavigate } from "react-router-dom";
import "../../styles/forms.css"

function TipList(){

    const [tips, setTips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            var c = await getTips();
            setTips(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div className="form-list">
            <button className="form-button create-button" onClick={() => navigate("/admin/tips/new")}>Dodaj wskazówkę</button>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nazwa</th>
                    <th>Zawartość</th>
                    <th></th>
                    <th></th>
                </tr>
            {isLoading && tips.map((t) => (
                <tr>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.content}</td>
                    <td><button className="form-button edit-button" onClick={() => navigate("/admin/tips/" + t.id + "/edit")}>Edytuj</button></td>
                    <td><button className="form-button delete-button" onClick={() => deleteTip(t.id)}>Usuń</button></td>
                </tr>
            ))}
            </table>
        </div>
    );

}

export default TipList;