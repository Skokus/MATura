import React, { useState, useEffect } from 'react';
import Step from './step/Step'
import AnswerInput from "./answerinput/AnswerInput";
import * as jsontask from './zadanie.json';

function Task(props){

    const [task, setTask] = useState(jsontask);
    var sc = new Array(Object.keys(task.steps).length).fill("basic");
    sc[0] = "beingDone"
    const [stepcounter, setStepCounter] = useState(0);
    const [stepCompletion, setStepCompletion] = useState(sc);

    function handleClick(answerValue){
        if(answerValue == task.steps[stepcounter].answer){
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
            {task.steps.map((step ,index) => (
                <Step answer={step.answer} completion={stepCompletion[index]} stepContent={step.content}/>
            ))}
            <AnswerInput handleClick={handleClick}/>
        </div>
    );
}

export default Task;