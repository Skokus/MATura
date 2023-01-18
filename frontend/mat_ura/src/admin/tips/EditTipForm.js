import React, { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { editTip, getTipById } from '../../api/TipService';

function EditTipForm(){

    const navigate = useNavigate();
    const {tipId} = useParams();
    const [tip, setTip] = useState();

    useEffect(() => {
        async function fetchData(){
            var t = await getTipById(tipId);
            setTip(t);
        }
        fetchData();
    },[]);

    const schema = `{
        "title": "Edytuj wskazówkę",
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

    const onSubmit = ({formData}, e) => {editTip(formData, tipId); navigate("/admin/tips");};

    return(
        <Form formData={tip} schema={schemaAsObject} onSubmit={onSubmit}/>
    );

}

export default EditTipForm;