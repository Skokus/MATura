import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import "./Tasklist.css"

function Tasklist(props){

    const [tasks, setTasks] = useState([]);
    const {categoryName} = useParams();

    useEffect(() => {
        const getNumberOfTasks = async () => {
            const res = await fetch("http://localhost:8080/categories/" + categoryName + "/numberOfTasks", getRequestOptions())
            const numberOfTasks = await res.json()
            setTasks(numberOfTasks);
        }
        getNumberOfTasks();
    },[]);

    function getRequestOptions() {
        return {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    return(
        <div>
            {Array.from(Array(tasks)).map((el, index) => (<Link className="text-link" to={"/categories/" + categoryName + "/" + index}>{index}</Link>))}
        </div>
    );
}

export default Tasklist;