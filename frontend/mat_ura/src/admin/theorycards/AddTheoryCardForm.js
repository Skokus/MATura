import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTheoryCard } from '../../api/TheoryCardsService';

function AddTheoryCardForm(){

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === "image"){
      setInputs(values => ({...values, [name]: e.target.files[0]})); 
    } else {
      setInputs(values => ({...values, [name]: value})); 
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tag", inputs.tag);
    formData.append("description", inputs.description);
    formData.append("cardsContent", inputs.cardsContent);
    formData.append("image", inputs.image);
    addTheoryCard(formData);
  }

  return(
      <div className="form-list" enctype="multipart/form-data">
          <form onSubmit={handleSubmit}>
              tag:<input type="text" name="tag" onChange={handleChange} required/>
              description:<input type="text" name="description" onChange={handleChange} required/>
              cardsContent:<input type="text" name="cardsContent" onChange={handleChange}/>
              image:<input type="file" name="image" onChange={handleChange}/>
              <input type="submit" value="Upload"/>
          </form>
      </div>
  );

}

export default AddTheoryCardForm;