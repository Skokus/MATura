import React, { useState, useEffect, useContext } from 'react';
import Step from './step/Step'
import AnswerInput from "./answerinput/AnswerInput";
import {useParams} from "react-router-dom";
import { getTask } from '../api/CategoryService';
import { patchTaskAsDone } from '../api/CategoryProgressService';
import {UserContext} from "../App.js"
import { MathJax } from 'better-react-mathjax';
import "./Task.css"
import Modal from './modal/Modal';

function Task(){

    const [task, setTask] = useState();
    const [stepcounter, setStepCounter] = useState(0);
    const [stepCompletion, setStepCompletion] = useState([]);
    const [tipNumber, setTipNumber] = useState(0);
    const [popupActive, setPopupActive] = useState(false);
    const {categoryName, numberInCategory} = useParams();
    const {token, setToken} = useContext(UserContext);


    useEffect(() => {
        const fetchData = async () => {
            var restask = await getTask(categoryName, numberInCategory);
            setTask(restask);
            setStepCompletion(new Array(Object.keys(await restask.steps).length).fill("beingDone", 0, 1).fill("basic", 1));
        }
        fetchData();
    },[]);

    function onCheckAnswer(answerValue){
        if(Number(answerValue) === task.steps[stepcounter].answer){
            var sc = stepcounter;
            var completioncopy = stepCompletion;
            completioncopy[sc] = "done";
            completioncopy[sc+1] = "beingDone";
            setStepCounter(sc+1);
            setStepCompletion(completioncopy);
            if(sc+1 == task.steps.length){
                setPopupActive(true);
                patchTaskAsDone(token, categoryName, numberInCategory);
            }
        }
    }

    function changeTip(){
        if(task){
            var n = tipNumber + 1;
            setTipNumber(n % task.tips.length);
        }
    }

    return(
        <div>
            <div className="task-question">
                <h1 className="task-question-header">Pytanie. {task ? numberInCategory : 0}</h1>
                <h2 className="task-question-content">{task ? <MathJax>{task.question + "\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax> : "loading"}</h2>
            </div>
            <div className="task-container">
                <div className="task-steps">
                    {task !== undefined ? (task.steps.map((step,index) => (
                        <Step id={"step-" + index} completion={stepCompletion[index]} step={step} handleAnswer={onCheckAnswer}/>
                    ))) : console.log("haha")}
                </div>
                {/*<div className="task-extras">
                    <div className="task-extras-tips">
                        <div className="task-extras-tips-header">Wskazówki</div>
                        <div className="task-extras-tips-tip">{task ? task.tips[tipNumber] : "Ładuje"}</div>
                        <button className="task-extras-tips-button" onClick={changeTip}>Następna wskazówka</button>
                    </div>
                    </div>*/}
            </div>
            <Modal isActive={popupActive}/>
        </div>
    );
}

export default Task;