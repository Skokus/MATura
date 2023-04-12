import React from 'react';
import "./EmailSentInfo.css"

function EmailSentInfo(){    

    return(
        <div className="emailsent">
          <div className="emailsent-header">Dziękujemy, że do nas dołączasz!</div>
          <div className="emailsent-content">Na twój email została wysłana wiadomość z linkiem aktywacyjnym.</div>
          <a className="login-register-link" href="/login">Przejdź na stronę logowania</a>
        </div>
    );
}

export default EmailSentInfo;