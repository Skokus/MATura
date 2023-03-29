import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { getCategoryProgress } from '../api/CategoryProgressService';
import { connect } from 'react-redux';
import "./Tasklist.css"

function Tasklist(props){

    const {categoryName} = useParams();
    const [progress, setProgress] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            var userprogress = await getCategoryProgress(props.token, categoryName);
            setProgress(Object.entries(userprogress.categoryAnswers));
            console.log(Object.entries(userprogress.categoryAnswers));
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div className="tasklist">
            {isLoading && <div><div className="tasklist-header">{categoryName}</div><br></br>
            <div className="tasklist-tasks">
                {progress.map(([key, value], index) => (<button id={"tasklink-" + categoryName + "-" + key} className={value == true ? "text-link task-done" : "text-link task-notdone"} onClick={() => navigate("/categories/" + categoryName + "/" + key)}>{index + 1}</button>))}</div>
            </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
}

export default connect(mapStateToProps, null) (Tasklist);