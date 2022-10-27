import React from 'react';
import "./Category.css"
import {Link} from "react-router-dom";
import icon from "./iconplaceholder.png";

function Category(props){    

    return(
        <div className = "category" style={{background: `linear-gradient(90deg, #09ba00 ${props.completion}% , white ${props.completion}%) right`}}>
            <img src={icon} alt={props.name}/>
            <div className="inline">
                <h2>{props.name}</h2><br></br>
            </div>
            <Link to={"/categories/" + props.name}>Go to about</Link>
        </div>
    );
}

export default Category;