import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTheoryCard } from '../../api/TheoryCardsService';

function AddTheoryCardForm(){

    const navigate = useNavigate();
    const schema = `{
        "title": "Utwórz fiszkę",
        "type": "object",
        "required": [
          "description"
        ],
        "properties": {
          "tag": {
            "type": "string",
            "title": "Tag"
          },
          "description": {
            "type": "string",
            "title": "Opis"
          },
          "cardsContent": {
            "type": "string",
            "title": "Treść fiszki"
          },
          "photoId": {
            "type": "string",
            "title": "Id zdjęcia"
          }
        }
    }`;

    const schemaAsObject = JSON.parse(schema);

    const onSubmit = ({formData}, e) => {addTheoryCard(formData); navigate("/admin/theory-cards");};

    return(
        <Form schema={schemaAsObject} onSubmit={onSubmit}/>
    );

}

export default AddTheoryCardForm;