import React from 'react';
import "./Category.css"
import {Link} from "react-router-dom";
import icon from "./iconplaceholder.png";
import { useNavigate, useLocation } from "react-router-dom";

function Category(props){    

    let navigate = useNavigate(); 
    const perc = props.completion ? Math.round(props.completion) : 0;
    const routeChange = () =>{ 
        let path = "/categories/" + props.name; 
        navigate(path);
    }

    return(
        <div className = "category" onClick={routeChange}>
            <div className="inline">
                <div className="category-name">{props.name} ({perc}%)</div>
                <div className="category-progress" style={{background: `linear-gradient(90deg, #00C700 ${perc}% , #E0E0E0 ${perc}%) right`}}></div>
            </div>
        </div>
    );
}
export default Category;