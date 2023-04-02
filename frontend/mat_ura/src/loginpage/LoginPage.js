import React, { useState} from 'react';
import { sendLogin, getUserWithToken } from '../api/UserService';
import { useNavigate } from "react-router-dom";
import "../styles/forms.css"
import "./LoginPage.css"
import { connect } from 'react-redux';

function LoginPage(props){

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
            const user = await getUserWithToken(tokens.access_token);
            props.setToken(tokens.access_token);
            props.setUser(user);
            props.logIn();
            navigate("/");
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

const mapDispatchToProps = (dispatch) => {
    return{
        logIn: () => { dispatch({type: 'LOG_IN'})},
        setToken: (token) => { dispatch({type: 'SET_TOKEN', token: token})},
        setUser: (user) => {dispatch({type: 'SET_USER', user: user})},
    }
}

export default connect(null, mapDispatchToProps) (LoginPage)