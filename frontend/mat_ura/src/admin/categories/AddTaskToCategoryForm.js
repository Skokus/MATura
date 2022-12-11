import React, { useState, useEffect, useContext} from 'react';
import {useParams } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTaskToCategory } from '../../api/CategoryService';

function AddTaskToCategoryForm(){

    const {categoryName} = useParams();
    const schema = `{
        "title": "Dodaj zadanie do kategorii",
        "type": "object",
        "required": [
          "id"
        ],
        "properties": {
          "id": {
            "type": "string",
            "title": "Id zadania"
          }
        }
      }`;

    const schemaAsObject = JSON.parse(schema);

    const onSubmit = ({formData}, e) => {addTaskToCategory(categoryName, formData);};

    return(
        <Form schema={schemaAsObject} onSubmit={onSubmit}/>
    );

}

export default AddTaskToCategoryForm;