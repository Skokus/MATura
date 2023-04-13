import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-jsonschema-form';
import { addTip } from '../../api/TipService';
import "../formstyle.css"
import { connect } from 'react-redux';
import { createUser } from '../../api/UserService';

function AddUserForm(props){

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(props.token, inputs);
    navigate("/admin/users");
  }

  return(
      <div className="form">
          <div className="form-header">Stwórz nowe konto</div>
          <form onSubmit={handleSubmit}>
            <div><label for="username" className="form-input-label">Login:</label><input className="form-input-text" type="text" name="username" onChange={handleChange} required/></div>
            <div><label for="password" className="form-input-label">Hasło:</label><input className="form-input-text" type="text" name="password" onChange={handleChange} required/></div>
            <div><label for="password" className="form-input-label">Email:</label><input className="form-input-text" type="text" name="email" onChange={handleChange} required/></div>
            <div><label for="role" className="form-input-label">Rola:</label></div>
            <div><select className="form-input-select" name="role" onChange={handleChange}>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_TEACHER">Nauczyciel</option>
            </select></div>
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

export default connect(mapStateToProps, null) (AddUserForm);