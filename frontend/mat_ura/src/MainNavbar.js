import React, {useState} from 'react';
import {Link} from "react-router-dom";
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
        <div id="navbar" className="mainNavbar">
            <Link className="mainNavbarLink navleft" to={"/"}>Strona Główna</Link>
            <Link className="mainNavbarLink navleft" to={"/admin/categories"}>Kategorie</Link>
            <Link className="mainNavbarLink navleft" to={"/admin/tasks"}>Zadania</Link>
            <Link className="mainNavbarLink navleft" to={"/admin/theory-cards"}>Fiszki</Link>
            <Link className="mainNavbarLink navleft" to={"/admin/tips"}>Wskazówki</Link>
            {!token 
                ? <Link className="mainNavbarLink navright" to={"/login"}>Zaloguj się</Link> 
                : <button className="mainNavbarLink navright" onClick={logOutUser}>Wyloguj</button>
            }
        </div>
    );
}

export default MainNavbar