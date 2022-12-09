import React, { useState, useEffect, useContext} from 'react';
import { sendLogin } from '../api/UserService';
import {UserContext} from "../App.js"
import { useNavigate } from "react-router-dom";

function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {token, setToken} = useContext(UserContext);
    const navigate = useNavigate();

    async function logIn(e){
        e.preventDefault();
        var tokens = await sendLogin(username, password);
        setToken(tokens.access_token);
        localStorage.setItem("token", JSON.stringify(tokens.access_token));
        navigate("/");
        window.location.reload(false);
    }

    return(
        <div className="login">
            <form onSubmit={logIn}>
                <div className="login-input-container">
                    <label className="login-label">Username </label>
                    <input name="username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-container">
                    <label className="login-label">Password </label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <a href="/register">Nie masz konta? Zarejestruj się!</a>
                <div className="button-container">
                    <button type="submit">Zaloguj się</button>
                </div>
            </form>
        </div>
    );

}

export default LoginPage;