import React, { useState} from 'react';
import { addCategory } from '../../api/CategoryService';
import "../formstyle.css"
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddCategoryForm(props){

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCategory(props.token, inputs);
    navigate("/admin/categories");
  }

  return(
      <div className="form">
          <div className="form-header">Dodaj kategorię</div>
          <form onSubmit={handleSubmit}>
              <label for="name" className="form-input-label">Nazwa:</label><input type="text" className="form-input-text" name="name" onChange={handleChange} required/>
              <div><input className="form-input-submit" type="submit" value="Dodaj"/></div>
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

export default connect(mapStateToProps, null) (AddCategoryForm);