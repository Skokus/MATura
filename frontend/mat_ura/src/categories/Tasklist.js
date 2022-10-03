import React, { useState, useEffect, useContext } from 'react';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { getNumberOfTasks } from '../api/CategoryService';
import "./Tasklist.css"
import {UserContext} from "../App.js"
import { getCategoryProgress } from '../api/CategoryProgressService';

function Tasklist(){

    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState([]);
    const {categoryName} = useParams();
    const {token, setToken} = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            var numberOfTasks = await getNumberOfTasks(categoryName);
            var userprogress = await getCategoryProgress(token, categoryName);
            setTasks(numberOfTasks);
            setProgress(userprogress.categoryAnswers);
        }
        fetchData();
    },[]);

    return(
        <div>
            <h3>{categoryName}</h3><br></br>
            {progress.map((el, index) => (console.log(el), <Link id={"tasklink-" + categoryName + "-" + index} className={el == true ? "text-link-done" : "text-link-notDone"} to={"/categories/" + categoryName + "/" + index}>{index}</Link>))}
        </div>
    );
}

export default Tasklist;