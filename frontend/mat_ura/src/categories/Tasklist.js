import React, { useState, useEffect, useContext } from 'react';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { getNumberOfTasks } from '../api/CategoryService';
import "./Tasklist.css"
import {UserContext} from "../App.js"
import { getCategoryProgress } from '../api/CategoryProgressService';

function Tasklist(){

    const {categoryName} = useParams();
    const [progress, setProgress] = useState();
    const [taskKeys, setTaskKeys] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    
    useEffect(() => {
        const fetchData = async () => {
            var userprogress = await getCategoryProgress(token, categoryName);
            setProgress(Object.entries(userprogress.categoryAnswers));
            console.log(Object.entries(userprogress.categoryAnswers));
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div className="tasklist">
            <h3>{categoryName}</h3><br></br>
            Wykonane zadania: 
            {isLoading && progress.map(([key, value], index) => (<Link id={"tasklink-" + categoryName + "-" + key} className={value == true ? "text-link task-done" : "text-link task-notdone"} to={"/categories/" + categoryName + "/" + key}>{index}</Link>))}
        </div>
    );
}

export default Tasklist;