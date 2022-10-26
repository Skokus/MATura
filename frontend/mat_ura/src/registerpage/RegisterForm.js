import React, { useState} from 'react';
import { sendRegister } from '../api/UserService';
import { useNavigate } from "react-router-dom";

function RegisterForm(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);
    const navigate = useNavigate();

    async function logIn(e){
        e.preventDefault();
        await sendRegister(username, email, password);
        navigate("/");
    }

    function checkMatchPassword(p, rp){
        if(p === rp){
            setIsPasswordMatched(true);
        } else {
            setIsPasswordMatched(false);
        }
    }

    return(
        <div className="login">
            <form onSubmit={logIn}>
                <div className="login-input-container">
                    <label className="login-label">Username </label>
                    <input name="username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="login-input-container">
                    <label className="email-label">Email </label>
                    <input name="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-container">
                    <label className="login-label">Password </label>
                    <input type="password" name="password" onChange={(e) => {setPassword(e.target.value); checkMatchPassword(repassword, e.target.value)}} required />
                </div>
                <div className="input-container">
                    <label className="login-label">RePassword </label>
                    <input type="repassword" name="repassword" onChange={(e) => {setRepassword(e.target.value); checkMatchPassword(password, e.target.value)}} required />
                </div>
                {!isPasswordMatched && <p className="register-not-match-password">Hasła muszą być identyczne</p>}
                <div className="button-container">
                    <button type="submit">Zaloguj się</button>
                </div>
            </form>
        </div>
    );

}

export default RegisterForm;