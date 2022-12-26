import React, { useState, useEffect, useContext } from 'react';
import { deleteTaskFromCategory, getCategory } from '../../api/CategoryService';
import { useNavigate } from "react-router-dom";
import {useParams } from "react-router-dom";
import "../../styles/forms.css"

function CategoryDetails(){

    const [category, setCategory] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();
    const {categoryName} = useParams();
    
    useEffect(() => {
        async function fetchData(){
            var c = await getCategory(categoryName);
            setCategory(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    return(
        <div>
            {isLoading && (<div>
                {category.name}
                <table>
                <tr>
                    <th>Id zadania</th>
                    <th></th>
                </tr>
                {category.tasks.map((taskid, index) => (
                    <tr>
                        <td>{taskid}</td>
                        <td><button className="form-button details-button">Pokaż zadanie</button></td>
                        <td><button className="form-button delete-button" onClick={() => deleteTaskFromCategory(category.name, taskid)}>Usuń</button></td>
                    </tr>
                ))}
                </table>
            </div>)}
        </div>
    );

}

export default CategoryDetails;