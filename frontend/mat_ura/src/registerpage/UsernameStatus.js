import React, { useEffect, useState } from 'react';
import "./UsernameStatus.css"

function UsernameStatus(props){    

  return(
    <div className="usernameStatus">
      {props.status == "empty" && <div></div>}
      {props.status == "loading" && <div className="usernameStatus-label usernameStatus-loading">...</div>}
      {props.status == "usernameTaken" && <div className="usernameStatus-label usernameStatus-taken">Nazwa użytkownika jest zajęta.</div>}
      {props.status == "usernameFree" && <div className="usernameStatus-label usernameStatus-free">Nazwa użytkownika jest wolna!</div>}
    </div>
  );

}

export default UsernameStatus;