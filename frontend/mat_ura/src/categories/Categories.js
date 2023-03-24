import React, { useState, useEffect } from 'react';
import Category from './Category';
import { getUserProgress } from '../api/CategoryProgressService';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneCalendar } from 'react-icons/ai';
import "./Categories.css"

function Categories(){

    const [categories, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            try{
                const test = await getUserProgress(token);
                setCategory(test);
                setIsLoading(true);
            }catch(error){
                navigate("/login");
            }
        }
        fetchData();
    },[]);
    
    return(
        <div className="categorylist">
            <button type="button" onClick={() => navigate("/dailyTask")} className="categorylist-daily-button" title="Zadanie dnia"><AiTwotoneCalendar/></button>
            {isLoading && categories.userProgress.map((category) => (
                <Category name={category.name} completion={(category.numberOfDoneTasks/category.numberOfTasks)*100} numberOfTasks={category.numberOfTasks}/>
            ))}
        </div>
    );

}

export default Categories;