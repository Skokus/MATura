import React, { useState, useEffect, useContext } from 'react';
import { deleteTask, getAllTasksIds } from '../../api/TaskService';
import { useNavigate } from "react-router-dom";
import "../liststyle.css"
import { connect } from 'react-redux';

function TaskList(props){

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            var c = await getAllTasksIds(props.token);
            setTasks(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    const onDeleteButtonClicked = async (id) => {
        await deleteTask(props.token, id);
        const copy = tasks.filter(task => task != id);
        setTasks(copy);
    }

    return(
        <div className="list">
            <div className="list-header">Zadania</div>
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
                    <td><button className="list-button details-button" onClick={() => navigate("/admin/tasks/" + t)}>Szczegóły</button></td>
                    <td><button className="list-button edit-button" onClick={() => navigate("/admin/tasks/" + t + "/edit")}>Edytuj</button></td>
                    <td><button className="list-button delete-button" onClick={() => onDeleteButtonClicked(t)}>Usuń</button></td>
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
  
export default connect(mapStateToProps, null) (TaskList);