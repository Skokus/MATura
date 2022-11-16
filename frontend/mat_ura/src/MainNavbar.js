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
            <Link className="mainNavbarLink navleft" to={"/"}>Strona Główna</Link>
            {!token 
                ? <Link className="mainNavbarLink navright" to={"/login"}>Zaloguj się</Link> 
                : <button className="mainNavbarLink navright" onClick={logOutUser}>Wyloguj</button>
            }
        </div>
    );
}

export default MainNavbar