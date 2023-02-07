import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import "./MainNavbar.css"
import {UserContext} from "./App.js"
import { useNavigate } from "react-router-dom";

function MainNavbar(){

    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();

    function logOutUser(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        navigate("/login");
    }

    return(
        <div id="navbar" className="mainNavbarWhole">
            <NavLink className="mainNavbarLink navleft" to={"/"}>Strona Główna</NavLink>
            <NavLink className="mainNavbarLink navleft" to={"/admin/categories"}>Kategorie</NavLink>
            <NavLink className="mainNavbarLink navleft" to={"/admin/tasks"}>Zadania</NavLink>
            <NavLink className="mainNavbarLink navleft" to={"/admin/theory-cards"}>Fiszki</NavLink>
            <NavLink className="mainNavbarLink navleft" to={"/admin/tips"}>Wskazówki</NavLink>
            {!token 
                ? <NavLink className="mainNavbarLink navright" to={"/login"}>Zaloguj się</NavLink> 
                : <button className="mainNavbarLink navright" onClick={logOutUser}>Wyloguj</button>
            }
        </div>
    );
}

export default MainNavbar