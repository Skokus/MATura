import React, { useState, useEffect, useContext } from 'react';
import { deleteTaskFromCategory, getCategory } from '../../api/CategoryService';
import { useNavigate } from "react-router-dom";
import {useParams } from "react-router-dom";
import "../../styles/forms.css"
import { connect } from 'react-redux';

function CategoryDetails(props){

    const [category, setCategory] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {categoryName} = useParams();
    
    useEffect(() => {
        async function fetchData(){
            var c = await getCategory(props.token, categoryName);
            setCategory(c);
            setIsLoading(true);
        }
        fetchData();
    },[]);

    const onDeleteButtonClicked = async (id) => {
        await deleteTaskFromCategory(props.token, category.name, id);
        const copy = category.tasks.filter(task => task != id);
        const catcopy = category;
        catcopy.tasks = copy;
        setCategory(catcopy);
    }

    return(
        <div className="list">
            {isLoading && (<div>
                <div className="list-header">{category.name}</div>
                <div><button type="button" className="list-button create-button" onClick={() => navigate(`/admin/categories/${categoryName}/addTask`)}>Dodaj zadanie</button></div>
                <table>
                <tr>
                    <th>Id zadania</th>
                    <th></th>
                </tr>
                {category.tasks.map((taskid, index) => (
                    <tr>
                        <td>{taskid}</td>
                        <td><button type="button" className="list-button details-button" onClick={() => navigate("/admin/tasks/" + taskid)}>Pokaż zadanie</button></td>
                        <td><button type="button" className="list-button delete-button" onClick={() => onDeleteButtonClicked(taskid)}>Usuń</button></td>
                    </tr>
                ))}
                </table>
            </div>)}
        </div>
    );

}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
}

export default connect(mapStateToProps, null) (CategoryDetails);