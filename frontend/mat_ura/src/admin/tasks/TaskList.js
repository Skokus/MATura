import React, { useState, useEffect, useContext } from 'react';
import { getAllTasksIds } from '../../api/TaskService';
import { useNavigate } from "react-router-dom";
import "../liststyle.css"

function TaskList(){

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            var c = await getAllTasksIds();
            setTasks(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div className="list">
            <button className="list-button create-button" onClick={() => navigate("/admin/tasks/new")}>Dodaj zadanie</button>
            <table>
                <tr>
                    <th>Id</th>
                    <th></th>
                    <th></th>
                </tr>
            {isLoading && tasks.map((t) => (
                <tr>
                    <td>{t}</td>
                    <td><button className="list-button edit-button" onClick={() => navigate("/admin/tasks/" + t + "/edit")}>Edytuj</button></td>
                    <td><button className="list-button delete-button" onClick={() => console.log("TODO")}>Usuń</button></td>
                </tr>
            ))}
            </table>
        </div>
    );

}

export default TaskList;