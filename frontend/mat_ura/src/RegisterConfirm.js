import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { confirmNewAccount } from './api/UserService';

function RegisterConfirm(){

    const {registerToken} = useParams();
    
    useEffect(() => {
        async function fetchData(){
            const res = confirmNewAccount(registerToken);
        }
        fetchData();
    },[]);

    return(
        <div>Email został potwierdzony!</div>
    );

}

export default (RegisterConfirm)