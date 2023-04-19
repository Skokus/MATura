import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { confirmNewAccount } from './api/UserService';
import "./RegisterConfirm.css"

function RegisterConfirm(){

    const {registerToken} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    useEffect(() => {
        async function fetchData(){
            const res = await confirmNewAccount(registerToken);
            if(res.state === "confirmed"){
                setIsError(false);
            } else {
                setIsError(true);
            }
            setIsLoading(false);
        }
        fetchData();
    },[]);

    return(
        <div className="emailconfirm">
            {!isLoading && <div>
                {isError && <div>
                    <div className="emailconfirm-header">Nie mogliśmy aktywować konta. Link jest niepoprawny albo przedawniony.</div>
                    <a className="login-register-link" href="/login">Przejdź na stronę logowania</a>    
                </div>}
                {!isError && <div>
                    <div className="emailconfirm-header">Konto zostało aktywowane!</div>
                    <a className="login-register-link" href="/login">Przejdź na stronę logowania</a>    
                </div>
                }
            </div>}
        </div>
        
    );

}

export default (RegisterConfirm)