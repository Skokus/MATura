import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import { getNumberOfTasks } from '../api/CategoryService';
import "./Tasklist.css"

function Tasklist(){

    const [tasks, setTasks] = useState([]);
    const {categoryName} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            var numberOfTasks = await getNumberOfTasks(categoryName);
            setTasks(numberOfTasks);
        }
        fetchData();
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
            <h3>{categoryName}</h3><br></br>
            {Array.from(Array(tasks)).map((el, index) => (<Link id={"tasklink-" + categoryName + "-" + index} className="text-link" to={"/categories/" + categoryName + "/" + index}>{index}</Link>))}
        </div>
    );
}

export default Tasklist;