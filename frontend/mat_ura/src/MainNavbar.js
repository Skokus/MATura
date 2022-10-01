import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import "./MainNavbar.css"
import {UserContext} from "./App.js"
import { useNavigate } from "react-router-dom";

function MainNavbar(){

    const {token, setToken} = useContext(UserContext);
    const navigate = useNavigate();

    function logOutUser(){
        setToken("");
        navigate("/");
    }

    return(
        <div id="navbar" className="mainNavbar">
            <Link className="mainNavbarLink" to={"/"}>Strona Główna</Link>
            <Link className="mainNavbarLink" to={"/about"}>O nas</Link>
            {!token 
                ? <Link className="mainNavbarLink" to={"/login"}>Zaloguj się</Link> 
                : <button className="mainNavbarLink" onClick={logOutUser}>Wyloguj</button>
            }
        </div>
    );
}

export default MainNavbar