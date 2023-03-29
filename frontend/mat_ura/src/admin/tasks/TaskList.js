import React, { useState, useEffect, useContext } from 'react';
import { getAllTasksIds } from '../../api/TaskService';
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

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
  }
  
export default connect(mapStateToProps, null) (TaskList);