import React, { useState, useEffect } from 'react';
import Category from './Category';
import { getUserProgress } from '../api/CategoryProgressService';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneCalendar } from 'react-icons/ai';
import "./Categories.css"
import { connect } from 'react-redux';
import Unauthorized from '../Unauthorized';

function Categories(props){

    const [categories, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            if(props.userLogged && props.user.role === "ROLE_USER"){
                const test = await getUserProgress(props.token);
                setCategory(test);
                setIsLoading(true);
            } else {
                navigate("login");
            }
        }
        fetchData();
    },[]);
    
    return(
        <div className="categorylist">
            {props.userLogged && props.user.role === "ROLE_USER" ?
                    <div>
                        <button type="button" onClick={() => navigate("/dailyTask")} className="categorylist-daily-button" title="Zadanie dnia"><AiTwotoneCalendar/></button>
                        {isLoading && categories.userProgress.map((category) => (
                            <Category name={category.name} completion={(category.numberOfDoneTasks/category.numberOfTasks)*100} numberOfTasks={category.numberOfTasks}/>
                        ))}
                    </div>
            :<Unauthorized/>}
        </div>
    );

}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token,
        user: state.user,
    }
}

export default connect(mapStateToProps, null) (Categories)