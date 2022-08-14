import React from 'react';
import {Link} from "react-router-dom";

//, { useState, useEffect }
function Category(props){    
    return(
        <div>
            <h2>{props.name}</h2>
            <Link to="/tasks/1"> Go to about</Link>
        </div>
    );
}

export default Category;