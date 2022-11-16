import React from 'react';
import "./Category.css"
import {Link} from "react-router-dom";
import icon from "./iconplaceholder.png";
import { useNavigate } from "react-router-dom";

function Category(props){    

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = "/categories/" + props.name; 
        navigate(path);
    }

    return(
        <div className = "category" onClick={routeChange} style={{background: `linear-gradient(90deg, #09ba00 ${props.completion}% , white ${props.completion}%) right`}}>
            <div className="inline">
                <h2>{props.name}</h2><br></br>
            </div>
        </div>
    );
}
//<Link to={"/categories/" + props.name}>Go to about</Link>
export default Category;