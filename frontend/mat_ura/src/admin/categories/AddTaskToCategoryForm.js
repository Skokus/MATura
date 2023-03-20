import React, { useState, useEffect, useContext} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTaskToCategory } from '../../api/CategoryService';

function AddTaskToCategoryForm(){

  const [inputs, setInputs] = useState({});
  const {categoryName} = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value})); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTaskToCategory(categoryName, inputs);
    navigate(`/admin/categories/${categoryName}`);
  }

  return(
    <div className="form-list">
      <div className="form-header">Dodaj zadanie do kategorii: {categoryName}</div>
      <form onSubmit={handleSubmit}>
        <div><label for="id" className="form-input-label">Id zadania:</label><input className="form-input-text" type="text" name="id" onChange={handleChange} required/></div>
        <input className="form-input-submit" type="submit" value="Dodaj"/>
      </form>
    </div>
  );

}

export default AddTaskToCategoryForm;