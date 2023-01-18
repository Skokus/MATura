import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTip } from '../../api/TipService';

function AddTipForm(){

    const navigate = useNavigate();
    const schema = `{
        "title": "Utwórz wskazówkę",
        "type": "object",
        "required": [
          "name",
          "content"
        ],
        "properties": {
          "name": {
            "type": "string",
            "title": "Nazwa"
          },
          "content": {
            "type": "string",
            "title": "Zawartość"
          }
        }
    }`;

    const schemaAsObject = JSON.parse(schema);

    const onSubmit = ({formData}, e) => {addTip(formData); navigate("/admin/tips");};

    return(
        <Form schema={schemaAsObject} onSubmit={onSubmit}/>
    );

}

export default AddTipForm;