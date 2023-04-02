import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from "react-router-dom";
import "../detailsstyle.css"
import { connect } from 'react-redux';
import { getTask } from '../../api/TaskService';
import { MathJax } from 'better-react-mathjax';
import StepDetails from './StepDetails';

function TaskDetails(props){

    const [task, setTask] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {taskId} = useParams();
    
    useEffect(() => {
        async function fetchData(){
            var t = await getTask(props.token, taskId);
            setTask(t);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div>
            {isLoading && (<div className="details">
                <div className="details-header">Szczegóły zadania: {task.id}</div>
                <div className="details-param">Pytanie: <MathJax><div className="details-param-value">{task.question}</div></MathJax></div>
                <div className="details-param"><div className="details-param-value">Kroki</div></div>
                {task.steps.map((el) => (
                    <StepDetails step={el}/>
                ))}
                <div className="details-param"><div className="details-param-value">Wzory</div></div>
                {task.theoryCards ? <table>
                    <tr>
                        <th>Id</th>
                        <th></th>
                    </tr>
                {task.theoryCards.map((el) => (
                    <tr>
                        <td>{el}</td>
                        <td><button className="list-button details-button" onClick={() => navigate("/admin/theory-cards/" + el )}>Szczegóły</button></td>
                    </tr>
                ))}
                </table> : "Brak"}
                <div className="details-param"><div className="details-param-value">Wskazówki</div></div>
                {task.tips ? <table>
                    <tr>
                        <th>Id</th>
                    </tr>
                {task.tips.map((el) => (
                    <tr>
                        <td>{el}</td>
                    </tr>
                ))}
                </table> : "Brak"}
            </div>)}
        </div>
    );

}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
}
  
export default connect(mapStateToProps, null) (TaskDetails);