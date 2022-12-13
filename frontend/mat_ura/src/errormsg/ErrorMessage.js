import React, { useState, useEffect, useContext } from 'react';

function ErrorMessage(){

    return(
        <div>
            Wystąpił nieoczekiwany błąd.
            <a href="/">Powrót na stronę główną</a>
        </div>
    );
}

export default ErrorMessage;