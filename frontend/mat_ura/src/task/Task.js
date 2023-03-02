import React, { useState, useEffect, useContext } from 'react';
import Step from './step/Step'
import AnswerInput from "./answerinput/AnswerInput";
import {useParams} from "react-router-dom";
import { getTask } from '../api/TaskService';
import { getTheoryCard } from '../api/TheoryCardsService';
import { patchTaskAsDone } from '../api/CategoryProgressService';
import { getPhoto } from '../api/PhotoService';
import {UserContext} from "../App.js"
import { MathJax } from 'better-react-mathjax';
import "./Task.css"
import Modal from './modal/Modal';
import Solution from './solution/Solution';
import TipBox from './tipbox/TipBox';
import TheoryCard from './theorycard/TheoryCard';
import { getTipById } from '../api/TipService';

function Task(){

    const [task, setTask] = useState();
    const [stepcounter, setStepCounter] = useState(0);
    const [stepCompletion, setStepCompletion] = useState([]);
    const [tipNumber, setTipNumber] = useState(0);
    const [theorycards, setTheoryCards] = useState([]);
    const [tips, setTips] = useState([]);
    const [theorycardsphotos, setTheoryCardsPhotos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const {categoryName, id} = useParams();
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            var restask = await getTask(id);
            var cards = [];
            for(const tcid of restask.theoryCards){
                var card = await getTheoryCard(tcid);
                cards.push(card);
            }
            var tips = [];
            for(const tid of restask.tips){
                var tip = await getTipById(tid);
                tips.push(tip);
            }
            setTask(restask);
            setTheoryCards(cards);
            setTips(tips);
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
                <h1 className="task-question-header">Pytanie.</h1>
                <h2 className="task-question-content">{task ? <MathJax>{task.question}</MathJax> : "loading"}</h2>
            </div>
            <div className="task-container">
                <div className="task-steps">
                    {task !== undefined ? (task.steps.map((step,index) => (
                        <Step id={"step-" + index} completion={stepCompletion[index]} step={step} handleAnswer={onCheckAnswer} idx={index}/>
                    ))) : console.log("haha")}
                </div>
                <div className="task-extras">
                    <Solution currentsolution={task.steps[stepcounter].currentSolution}/>
                    <TheoryCard theorycards={theorycards}/>
                    <TipBox tips={tips}/>
                </div>
            </div>
            <Modal isActive={popupActive}/>
        </div>}
        </div>
    );
}

export default Task;