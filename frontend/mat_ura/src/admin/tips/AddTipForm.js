import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTip } from '../../api/TipService';
import "../formstyle.css"
import { connect } from 'react-redux';

function AddTipForm(props){

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTip(props.token, inputs);
    navigate("/admin/tips");
  }

  return(
      <div className="form">
          <div className="form-header">Dodaj wskazówkę</div>
          <form onSubmit={handleSubmit}>
            <div><label for="name" className="form-input-label">Nazwa:</label><input className="form-input-text" type="text" name="name" onChange={handleChange} required/></div>
            <div><label for="content" className="form-input-label">Zawartość:</label><textarea className="form-input-textarea" name="content" rows="4" cols="50" onChange={handleChange} required/></div>
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

export default connect(mapStateToProps, null) (AddTipForm);