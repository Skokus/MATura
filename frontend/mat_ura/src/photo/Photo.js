import React, { useState, useEffect} from 'react';
import { getPhoto } from '../api/PhotoService';
import './Photo.css'
function Photo(){
    const [photo, setPhoto] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            var restask = await getPhoto();
            setPhoto(restask);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div>
            {isLoading && <img src={"data:image/jpeg;base64," + photo.image.data}></img>}
        </div>
    )
}

export default Photo;