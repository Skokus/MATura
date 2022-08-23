import React from 'react';
import {Link} from "react-router-dom";
import "./MainNavbar.css"

function MainNavbar(){

    return(
        <div id="navbar" className="mainNavbar">
            <Link className="mainNavbarLink" to={"/"}>Strona Główna</Link>
            <Link className="mainNavbarLink" to={"/about"}>O nas</Link>
        </div>
    );
}

export default MainNavbar