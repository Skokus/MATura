import React, { useState, useEffect, useContext } from 'react';
import { deleteCategory, getCategories } from '../../api/CategoryService';
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../../errormsg/ErrorMessage';
import "../../styles/forms.css"
function CategoryList(){

    const [categories, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token"))
    );
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            try{
                var c = await getCategories();
                setCategory(c);
                setIsLoading(true);
            } catch (error){
                setIsError(true);
            }
        }
        fetchData();
    },[]);

    return(
        <div className="form-list">
            {isError && <ErrorMessage/>}
            {isLoading &&
            <div>
            <button className="form-button create-button" onClick={() => navigate("/admin/categories/new")}>Dodaj kategorię</button>
            <table>
                <tr>
                    <th>Nazwa kategorii</th>
                    <th></th>
                </tr>
            {categories.map((category) => (
                <tr>
                    <td>{category.name}</td>
                    <td><button className="form-button details-button" onClick={() => navigate("/admin/categories/" + category.name)}>Szczegóły</button></td>
                    <td><button className="form-button delete-button" onClick={() => deleteCategory(category.id)}>Usuń</button></td>
                </tr>))}
            </table>
            </div>
            }
        </div>
    );

}

export default CategoryList;