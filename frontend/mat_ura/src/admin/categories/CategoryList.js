import React, { useState, useEffect, useContext } from 'react';
import { deleteCategory, getCategories } from '../../api/CategoryService';
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../../errormsg/ErrorMessage';
import "../liststyle.css"
import { connect } from 'react-redux';
function CategoryList(props){

    const [categories, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            try{
                var c = await getCategories(props.token);
                setCategory(c);
                setIsLoading(true);
            } catch (error){
                setIsError(true);
            }
        }
        fetchData();
    },[]);

    const onDeleteButtonClicked = async (id) => {
        await deleteCategory(props.token, id);
        const copy = categories.filter(c => c.id != id);
        setCategory(copy);
    }

    return(
        <div className="list">
            <div className="list-header">Kategorie</div>
            {isLoading &&
            <div>
            <button className="list-button create-button" onClick={() => navigate("/admin/categories/new")}>Dodaj kategorię</button>
            <table>
                <tr>
                    <th>Nazwa kategorii</th>
                    <th></th>
                </tr>
            {categories.map((category) => (
                <tr>
                    <td>{category.name}</td>
                    <td><button className="list-button details-button" onClick={() => navigate("/admin/categories/" + category.name)}>Szczegóły</button></td>
                    <td><button className="list-button delete-button" onClick={() => onDeleteButtonClicked(category.id)}>Usuń</button></td>
                </tr>))}
            </table>
            </div>
            }
        </div>
    );

}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
}

export default connect(mapStateToProps, null) (CategoryList);