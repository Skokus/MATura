import React, { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { editTheoryCard, getTheoryCard } from '../../api/TheoryCardsService';
import { postPhoto } from '../../api/PhotoService';

function EditTheoryCardForm(){

  const navigate = useNavigate();
  const {theoryCardId} = useParams();
  const [theorycard, setTheorycard] = useState();
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      async function fetchData(){
          var t = await getTheoryCard(theoryCardId);
          setTheorycard(t);
          setInputs(t);
          setIsLoading(true);
      }
      fetchData();
  },[]);

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
    const fileData = new FormData();
    if(file){
      fileData.append("images[]", file);
      const id = await postPhoto(fileData);
      inputs.imageid = id[0];
    }
    await editTheoryCard(inputs, theoryCardId);
    navigate("/admin/theory-cards");
  }

  return(
    <div>
      {isLoading && 
      <div className="form">
        <div className="form-header">Edytuj wzór</div>
        <form onSubmit={handleSubmit}>
          <div><label for="name" className="form-input-label">Tag:</label><input className="form-input-text" type="text" name="tag" defaultValue={theorycard.tag} onChange={handleChange} required/></div>
          <div><label for="description" className="form-input-label">Opis:</label><input className="form-input-text" type="text" name="description" defaultValue={theorycard.description} onChange={handleChange} required/></div>
          <div><label for="cardsContent" className="form-input-label">Zawartość wzoru:</label><input className="form-input-text" type="text" defaultValue={theorycard.cardsContent} name="cardsContent" onChange={handleChange}/></div>
          <div><label for="image" className="form-input-label">Zdjęcie:</label><input className="form-input-file" type="file" name="image" onChange={handleChange}/></div>
          <input className="form-input-submit" type="submit" value="Wyślij"/>
        </form>
      </div>}
    </div>
  );
}

export default EditTheoryCardForm;