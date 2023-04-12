import React from 'react';
import "./UserStatus.css"

function UserStatus(props){    

  return(
    <div className="userStatus">
      {props.status === "empty" && <div></div>}
      {props.status === "loading" && <div className="userStatus-label userStatus-loading">...</div>}
      {props.status === "userTaken" && <div className="userStatus-label userStatus-taken">{props.name} jest zajęty.</div>}
      {props.status === "userFree" && <div className="userStatus-label userStatus-free">{props.name} jest wolny!</div>}
    </div>
  );

}

export default UserStatus;