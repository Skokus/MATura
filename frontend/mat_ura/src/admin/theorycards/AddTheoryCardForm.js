import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTheoryCard } from '../../api/TheoryCardsService';
import { postPhoto } from '../../api/PhotoService';


function AddTheoryCardForm(){

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === "image"){
      setFile(e.target.files[0]); 
    } else {
      setInputs(values => ({...values, [name]: value})); 
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tag", inputs.tag);
    formData.append("description", inputs.description);
    formData.append("cardsContent", inputs.cardsContent);
    const fileData = new FormData();
    fileData.append("images[]", file);
    const id = await postPhoto(fileData);
    console.log(id);
    formData.append("imageid", id[0]);
    addTheoryCard(formData);
  }

  return(
      <div className="form" enctype="multipart/form-data">
        <div className="form-header">Dodaj wzór</div>
        <form onSubmit={handleSubmit}>
          <div><label for="name" className="form-input-label">Tag:</label><input type="text" name="tag" onChange={handleChange} required/></div>
          <div><label for="description" className="form-input-label">Tag:</label><input type="text" name="description" onChange={handleChange} required/></div>
          <div><label for="cardsContent" className="form-input-label">Zawartość wzoru:</label><input type="text" name="cardsContent" onChange={handleChange}/></div>
          <div><label for="cardsContent" className="form-input-label">Zdjęcie:</label><input type="file" name="image" onChange={handleChange}/></div>
          <input className="form-input-submit" type="submit" value="Wyślij"/>
        </form>
      </div>
  );

}

export default AddTheoryCardForm;