import React, { useState, useEffect} from 'react';
import './Photo.css'
function Photo(props){
    
    return(
        <div>
            <img src={"data:image/jpeg;base64," + props.image.data}></img>
        </div>
    )
}

export default Photo;