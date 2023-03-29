import React, { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { editTip, getTipById } from '../../api/TipService';
import { connect } from 'react-redux';

function EditTipForm(props){

  const navigate = useNavigate();
  const {tipId} = useParams();
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tip, setTip] = useState();

  useEffect(() => {
      async function fetchData(){
          var t = await getTipById(props.token, tipId);
          setTip(t);
          setInputs(t);
          setIsLoading(true);
      }
      fetchData();
  },[]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTip(props.token, inputs, tipId);
    navigate("/admin/tips");
  }

  return(
    <div>
      {isLoading && <div className="form">
          <div className="form-header">Edytuj wskazówkę</div>
          <form onSubmit={handleSubmit}>
              <label for="name" className="form-input-label">Nazwa:</label><input className="form-input-text" type="text" name="name" onChange={handleChange} defaultValue={tip.name} required/>
              <div><label for="content" className="form-input-label">Zawartość:</label><textarea className="form-input-textarea" name="content" rows="4" cols="50" defaultValue={tip.content} onChange={handleChange} required/></div>
              <input className="form-input-submit" type="submit" value="Wyślij"/>
          </form>
      </div>}
    </div>
  );
    
}

const mapStateToProps = (state) => {
  return{
      userLogged: state.userLoggedIn,
      token: state.token
  }
}

export default connect(mapStateToProps, null) (EditTipForm);