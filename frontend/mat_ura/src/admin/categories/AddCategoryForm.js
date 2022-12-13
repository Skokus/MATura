import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addCategory } from '../../api/CategoryService';

function AddCategoryForm(){

    const navigate = useNavigate();
    const schema = `{
        "title": "Stwórz kategorię",
        "type": "object",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "title": "Nazwa"
          }
        }
    }`;

    const schemaAsObject = JSON.parse(schema);

    const onSubmit = ({formData}, e) => {addCategory(formData); navigate("/admin/categories");};

    return(
        <Form schema={schemaAsObject} onSubmit={onSubmit}/>
    );

}

export default AddCategoryForm;