import React, { useState, useEffect } from 'react';

function LoginPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function getRequestOptions() {
        return {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    function logIn(e){
        e.preventDefault();
        console.log(username);
        console.log(password);
    }

    return(
        <div className="Login">
            <form onSubmit={logIn}>
                <div className="input-container">
                    <label>Username </label>
                    <input name="username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-container">
                    <label>Password </label>
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