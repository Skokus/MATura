import React, { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { editTheoryCard, getTheoryCard } from '../../api/TheoryCardsService';

function EditTheoryCardForm(){

    const navigate = useNavigate();
    const {theoryCardId} = useParams();
    const [theorycard, setTheorycard] = useState();

    useEffect(() => {
        async function fetchData(){
            var t = await getTheoryCard(theoryCardId);
            setTheorycard(t);
        }
        fetchData();
    },[]);

    const schema = `{
        "title": "Edytuj fiszkę",
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

    const onSubmit = ({formData}, e) => {editTheoryCard(formData, theoryCardId); navigate("/admin/theory-cards");};

    return(
        <Form formData={theorycard} schema={schemaAsObject} onSubmit={onSubmit}/>
    );

}

export default EditTheoryCardForm;