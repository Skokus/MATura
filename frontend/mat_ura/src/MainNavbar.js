import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import "./MainNavbar.css"
import {UserContext} from "./App.js"
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

function MainNavbar(props){

    const navigate = useNavigate();

    function logOutUser(){
        props.logOut();
        navigate("/login");
    }

    return(
        <div id="navbar" className="mainNavbarWhole">
            {props.userLogged && props.user.role === "ROLE_USER" &&
                <div>
                    <NavLink className="mainNavbarLink navleft" to={"/"}>Strona Główna</NavLink>
                    <NavLink className="mainNavbarLink navleft" to={"/formulas"}>Wzory</NavLink>
                </div>
            }
            {props.userLogged && props.user.role === "ROLE_USER" &&
                <div>
                    <NavLink className="mainNavbarLink navleft" to={"/admin/categories"}>Kategorie</NavLink>
                    <NavLink className="mainNavbarLink navleft" to={"/admin/tasks"}>Zadania</NavLink>
                    <NavLink className="mainNavbarLink navleft" to={"/admin/theory-cards"}>Fiszki</NavLink>
                    <NavLink className="mainNavbarLink navleft" to={"/admin/tips"}>Wskazówki</NavLink>
                </div>
            }
            {!props.userLogged 
                ? <NavLink className="mainNavbarLink navright" to={"/login"}>Zaloguj się</NavLink> 
                : <button className="mainNavbarLink navright" onClick={logOutUser}>Wyloguj</button>
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return{
        logOut: () => { dispatch({type: 'LOG_OUT'})},
    }
}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MainNavbar)