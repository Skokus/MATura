import React, { useState, useEffect, useContext } from 'react';
import Step from './step/Step'
import AnswerInput from "./answerinput/AnswerInput";
import {useParams} from "react-router-dom";
import { getTask } from '../api/TaskService';
import { patchTaskAsDone } from '../api/CategoryProgressService';
import {UserContext} from "../App.js"
import { MathJax } from 'better-react-mathjax';
import "./Task.css"
import Modal from './modal/Modal';
import Solution from './solution/Solution';
import TipBox from './tipbox/TipBox';

function Task(props){

    const [task, setTask] = useState();
    const [stepcounter, setStepCounter] = useState(0);
    const [stepCompletion, setStepCompletion] = useState([]);
    const [tipNumber, setTipNumber] = useState(0);
    const [popupActive, setPopupActive] = useState(false);
    const {categoryName, id} = useParams();
    const {token, setToken} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            var restask = await getTask(id);
            setTask(restask);
            setStepCompletion(new Array(Object.keys(await restask.steps).length).fill("beingDone", 0, 1).fill("basic", 1));
            setIsLoading(false);
        }
        fetchData();
    },[]);

    function onCheckAnswer(answerValue){
        if(answerValue === task.steps[stepcounter].answer){
            var sc = stepcounter;
            var completioncopy = stepCompletion;
            completioncopy[sc] = "done";
            completioncopy[sc+1] = "beingDone";
            setStepCompletion(completioncopy);
            if(sc+1 == task.steps.length){
                setPopupActive(true);
                patchTaskAsDone(token, categoryName, id);
            } else {
                setStepCounter(sc+1);
            }
        }
    }

    return(
        <div>
        {isLoading === false && <div>
            <div className="task-question">
                <h1 className="task-question-header">Pytanie. {task ? "0" : 0}</h1>
                <h2 className="task-question-content">{task ? <MathJax>{task.question}</MathJax> : "loading"}</h2>
            </div>
            <div className="task-container">
                <div className="task-steps">
                    {task !== undefined ? (task.steps.map((step,index) => (
                        <Step id={"step-" + index} completion={stepCompletion[index]} step={step} handleAnswer={onCheckAnswer}/>
                    ))) : console.log("haha")}
                </div>
                <div className="task-extras">
                    <Solution currentsolution={task.steps[stepcounter].currentSolution}/>
                    <TipBox tips={task.tips}/>
                </div>
            </div>
            <Modal isActive={popupActive}/>
        </div>}
        </div>
    );
}

export default Task;