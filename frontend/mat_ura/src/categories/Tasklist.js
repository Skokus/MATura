import React, { useState, useEffect, useContext } from 'react';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { getNumberOfTasks } from '../api/CategoryService';
import "./Tasklist.css"
import {UserContext} from "../App.js"
import { getCategoryProgress } from '../api/CategoryProgressService';

function Tasklist(){

    const {categoryName} = useParams();
    const {token, setToken} = useContext(UserContext);
    const [progress, setProgress] = useState();
    const [taskKeys, setTaskKeys] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
        <div>
            <h3>{categoryName}</h3><br></br>
            {isLoading && progress.map(([key, value], index) => (<Link id={"tasklink-" + categoryName + "-" + key} className={value == true ? "text-link-done" : "text-link-notDone"} to={"/categories/" + categoryName + "/" + key}>{index}</Link>))}
        </div>
    );
}

export default Tasklist;