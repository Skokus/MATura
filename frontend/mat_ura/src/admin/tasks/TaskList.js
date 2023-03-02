import React, { useState, useEffect, useContext } from 'react';
import { getAllTasks } from '../../api/TaskService';
import { useNavigate } from "react-router-dom";
import "../../styles/forms.css"

function TaskList(){

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            var c = await getAllTasks();
            setTasks(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div className="form-list">
            <button className="form-button create-button" onClick={() => navigate("/admin/tasks/new")}>Dodaj zadanie</button>
            <table>
                <tr>
                    <th>Id</th>
                    <th></th>
                    <th></th>
                </tr>
            {isLoading && tasks.map((t) => (
                <tr>
                    <td>{t.id}</td>
                    <td><button className="form-button edit-button" onClick={() => navigate("/admin/tasks/" + t.id + "/edit")}>Edytuj</button></td>
                    <td><button className="form-button delete-button" onClick={() => console.log("TODO")}>Usuń</button></td>
                </tr>
            ))}
            </table>
        </div>
    );

}

export default TaskList;