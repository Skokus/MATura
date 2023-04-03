import React from 'react';
import "./UserStatus.css"

function UserStatus(props){    

  return(
    <div className="userStatus">
      {props.status == "empty" && <div></div>}
      {props.status == "loading" && <div className="userStatus-label userStatus-loading">...</div>}
      {props.status == "userTaken" && <div className="userStatus-label userStatus-taken">{props.} jest zajęta.</div>}
      {props.status == "userFree" && <div className="userStatus-label userStatus-free">Nazwa użytkownika jest wolna!</div>}
    </div>
  );

}

export default UserStatus;