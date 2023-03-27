import React, { useState, useEffect, useContext} from 'react';
import { sendLogin, getUserWithToken } from '../api/UserService';
import {UserContext} from "../App.js"
import { useNavigate } from "react-router-dom";
import "../styles/forms.css"
import "./LoginPage.css"
function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    async function logIn(e){
        setIsError(false);
        e.preventDefault();
        var response = await sendLogin(username, password);
        if(response?.ok){
            const tokens = await response.json();
            props.onSuccessfulLogin(tokens.access_token);
            var user = await getUserWithToken(tokens.access_token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
            window.location.reload(false);
        } else {
            setIsError(true);
        }
    }

    return(
        <div className="login-form">
            <div className="login-header">Zaloguj się!</div>
            <form onSubmit={logIn}>
                <div className="login-input-container">
                    <label className="login-label">Nazwa użytkownika</label>
                    <input className="login-input" name="username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="login-input-container">
                    <label className="login-label">Hasło</label>
                    <input className="login-input" type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <a className="login-register-link" href="/register">Nie masz konta? Zarejestruj się!</a>
                {isError && <div className="login-error">Niepoprawne dane logowania</div>}
                <div className="button-container">
                    <button className="login-button" type="submit">Zaloguj się</button>
                </div>
            </form>
        </div>
    );

}

export default LoginPage;