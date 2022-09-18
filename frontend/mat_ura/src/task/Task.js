import React, { useState, useEffect } from 'react';
import Step from './step/Step'
import AnswerInput from "./answerinput/AnswerInput";
import {useParams} from "react-router-dom";
import { getTask } from '../api/CategoryService';

function Task(){

    const [task, setTask] = useState();
    const [stepcounter, setStepCounter] = useState(0);
    const [stepCompletion, setStepCompletion] = useState([]);
    const {categoryName, numberInCategory} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            var restask = await getTask(categoryName, numberInCategory);
            setTask(restask);
            setStepCompletion(new Array(Object.keys(await restask.steps).length).fill("beingDone", 0, 1).fill("basic", 1));
        }
        fetchData();
    },[]);

    function handleClick(answerValue){
        if(Number(answerValue) === task.steps[stepcounter].answer){
            var sc = stepcounter;
            var completioncopy = stepCompletion;
            completioncopy[sc] = "done";
            completioncopy[sc+1] = "beingDone";
            setStepCounter(sc+1);
            setStepCompletion(completioncopy);
        }
    }

    return(
        <div>
            {task !== undefined ? (task.steps.map((step,index) => (
                <Step id={"step-" + index} answer={step.answer} completion={stepCompletion[index]} stepContent={step.content}/>
            ))) : console.log("haha")}
            <AnswerInput id="answerInput" handleClick={handleClick}/>
        </div>
    );
}

export default Task;