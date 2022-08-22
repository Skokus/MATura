import React from 'react';
import {Link} from "react-router-dom";

function CategoryNavbar(){

    return(
        <div>
            <Link to={"/"}>Strona Główna</Link>
            <Link to={"/about"}>O nas</Link>
        </div>
    );
}

export default CategoryNavbar