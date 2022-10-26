import React, { useState, useEffect, useContext } from 'react';
import Category from './Category';
import { getUserProgress } from '../api/CategoryProgressService';
import {UserContext} from "../App.js"

function Categories(props){

    const [categories, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {token, setToken} = useContext(UserContext);

    useEffect(() => {
        async function fetchData(){
            var test = await getUserProgress(token);
            setCategory(test);
            setIsLoading(true);
        }
        fetchData();
    },[]);
    
    return(
        <div>
            {isLoading && categories.userProgress.map((category) => (
                <Category name={category.name} completion={(category.numberOfDoneTasks/category.numberOfTasks)*100}/>
            ))}
        </div>
    );

}

export default Categories;