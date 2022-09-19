import React, { useState, useEffect } from 'react';
import { sendLogin } from '../api/UserService';

function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function logIn(e){
        e.preventDefault();
        var lmao = await sendLogin(username, password);
    }

    return(
        <div className="login">
            <form onSubmit={logIn}>
                <div className="login-input-container">
                    <label classname="login-label">Username </label>
                    <input name="username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-container">
                    <label classname="login-label">Password </label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="button-container">
                    <button type="submit">Zaloguj się</button>
                </div>
            </form>
        </div>
    );

}

export default LoginPage;