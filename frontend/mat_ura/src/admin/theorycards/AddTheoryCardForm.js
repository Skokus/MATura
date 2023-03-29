import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTheoryCard } from '../../api/TheoryCardsService';
import { postPhoto } from '../../api/PhotoService';
import "../formstyle.css"
import { connect } from 'react-redux';

function AddTheoryCardForm(props){

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
      const id = await postPhoto(props.token, fileData);
      inputs.imageid = id[0];
    }
    await addTheoryCard(props.token, inputs);
    navigate("/admin/theory-cards");
  }

  return(
    <div className="form">
      <div className="form-header">Dodaj wzór</div>
      <form onSubmit={handleSubmit}>
        <div><label for="name" className="form-input-label">Tag:</label><input className="form-input-text" type="text" name="tag" onChange={handleChange} required/></div>
        <div><label for="description" className="form-input-label">Opis:</label><input className="form-input-text" type="text" name="description" onChange={handleChange} required/></div>
        <div><label for="cardsContent" className="form-input-label">Zawartość wzoru:</label><input className="form-input-text" type="text" name="cardsContent" onChange={handleChange}/></div>
        <div><label for="image" className="form-input-label">Zdjęcie:</label><input className="form-input-file" type="file" name="image" onChange={handleChange}/></div>
        <input className="form-input-submit" type="submit" value="Wyślij"/>
      </form>
    </div>
  );

}

const mapStateToProps = (state) => {
  return{
      userLogged: state.userLoggedIn,
      token: state.token
  }
}

export default connect(mapStateToProps, null) (AddTheoryCardForm);