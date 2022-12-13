import React, { useState, useEffect, useContext } from 'react';
import { deleteCategory, getCategories } from '../../api/CategoryService';
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../../errormsg/ErrorMessage';

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
        <div>
            {isError && <ErrorMessage/>}
            <button onClick={() => navigate("/admin/categories/add")}>Dodaj kategorię</button>
            <table>
                <tr>
                    <th>Nazwa kategorii</th>
                    <th></th>
                </tr>
            {isLoading &&
            categories.map((category) => (
                <tr>
                    <td>{category.name}</td>
                    <td><button onClick={() => navigate("/admin/categories/" + category.name)}>Szczegóły</button></td>
                    <td><button onClick={() => deleteCategory(category.id)}>Usuń</button></td>
                </tr>
            ))}
            </table>
        </div>
    );

}

export default CategoryList;