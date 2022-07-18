import React from "react";
import Step from './step/Step'
import AnswerInput from "./answerinput/AnswerInput";
import * as task from '../zadanie.json';
import { withRouter } from 'react-router-dom'
class StepList extends React.Component{
    
    constructor(props) {
        super(props);
        var thistask = task;
        this.state = {
            task: thistask,
            stepcounter: 0,
            stepCompletion: new Array(Object.keys(thistask.steps).length).fill("basic")
        };
        this.state.stepCompletion[0] = "beingDone"
    }

    handleClick = (answerValue) => {
        if(answerValue == this.state.task.steps[this.state.stepcounter].answer){
            var sc = this.state.stepcounter;
            var completioncopy = this.state.stepCompletion;
            completioncopy[sc] = "done"
            completioncopy[sc+1] = "beingDone"
            this.setState({stepcounter: sc+1, stepCompletion: completioncopy})
        }
        console.log("lmao")
    }

    render(){
        return(
            <div>
                {this.state.task.steps.map((step,index) => (
                    <Step answer={step.answer} completion={this.state.stepCompletion[index]} stepContent={step.content}/>
                ))}
                <AnswerInput handleClick={this.handleClick}/>
            </div>
        );
    }
}

export default StepList;