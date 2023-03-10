import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTip } from '../../api/TipService';

function AddTipForm(){

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTip(inputs);
  }

  return(
      <div className="form-list">
          <form onSubmit={handleSubmit}>
              name:<input type="text" name="name" onChange={handleChange} required/>
              content:<input type="text" name="content" onChange={handleChange} required/>
              <input type="submit" value="Upload"/>
          </form>
      </div>
  );

}

export default AddTipForm;