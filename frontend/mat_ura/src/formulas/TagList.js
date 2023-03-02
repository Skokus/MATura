import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function TagList(props){    

    let navigate = useNavigate(); 

    return(
        <div>
            <div className="inline">
                <h2>{props.name} ({props.completion ? Math.round(props.completion) : 0}%)</h2><br></br>
            </div>
        </div>
    );
}
export default TagList;