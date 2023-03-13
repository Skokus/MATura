import React, { useState} from 'react';
import { checkUsername, sendRegister } from '../api/UserService';
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css"
import UsernameStatus from './UsernameStatus';

function RegisterForm(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    const navigate = useNavigate();

    async function logIn(e){
        e.preventDefault();
        await sendRegister(username, email, password);
        navigate("/login");
    }

    function checkMatchPassword(p, rp){
        if(p === rp){
            setIsPasswordMatched(true);
        } else {
            setIsPasswordMatched(false);
        }
    }

    async function onChangeUsername(u){
        if(u){
            setUsername(u);
            setIsUsernameTaken("loading");
            const t = await checkUsername(u);
            if(t){
                setIsUsernameTaken("usernameTaken");
            } else {
                setIsUsernameTaken("usernameFree");
            }
        } else {
            setIsUsernameTaken("empty");
        }
    }

    return(
        <div className="register-form">
            <div className="register-header">Zarejestruj się już dziś!</div>
            <form onSubmit={logIn}>
                <div className="register-input-container">
                    <label className="register-label">Login</label>
                    <input className="register-input" name="username" onChange={(e) => onChangeUsername(e.target.value)} required />
                </div>
                <UsernameStatus status={isUsernameTaken}/>
                <div className="register-input-container">
                    <label className="register-label">Adres email</label>
                    <input className="register-input" name="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="register-input-container">
                    <label className="register-label">Hasło</label>
                    <input className="register-input" type="password" name="password" onChange={(e) => {setPassword(e.target.value); checkMatchPassword(repassword, e.target.value)}} required />
                </div>
                <div className="register-input-container">
                    <label className="register-label">Powtórz hasło</label>
                    <input className="register-input" type="password" name="repassword" onChange={(e) => {setRepassword(e.target.value); checkMatchPassword(password, e.target.value)}} required />
                </div>
                {!isPasswordMatched && <p className="register-not-match-password">Hasła muszą być identyczne</p>}
                <div className="register-button-container">
                    <button className="register-button" type="register-button-submit">Zarejestruj się</button>
                </div>
            </form>
        </div>
    );

}

export default RegisterForm;