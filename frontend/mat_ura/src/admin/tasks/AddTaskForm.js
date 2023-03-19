import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { addTask } from '../../api/TaskService';
import Form from 'react-jsonschema-form';
import { addCategory } from '../../api/CategoryService';
import { postPhoto } from '../../api/PhotoService';

function AddTaskForm(){

  const [inputs, setInputs] = useState({steps: []});
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var steps = inputs.steps.slice();
    const fileData = new FormData();
    for(const el of files){
      fileData.append("images[]", el);
    }
    const ids = await postPhoto(fileData);
    for(let i = 0; i < ids.length; i++){
      steps[i].imageId = ids[i];
    }
    setInputs(values => ({...values, steps: steps}));
    addTask(inputs);
  }

  const handleArrayChange = (e, idx) => {
    var steps = inputs.steps.slice();
    const name = e.target.name;
    const value = e.target.value;
    if(name === "image"){
      var f = files.slice();
      f[idx] = e.target.files[0];
      setFiles(f); 
    } else {
      steps[idx][name] = value;
      setInputs(values => ({...values, steps: steps}));
    }
  }

  const addStep = () => {
    setInputs(values => ({...values, steps: [...inputs.steps, {}]}));
    setFiles(values => ([...values, null]));
  }

  const deleteStep = () => {
    var steps = inputs.steps.slice();
    var f = files.slice();
    steps.pop();
    f.pop();
    setInputs(values => ({...values, steps: steps}));
    setFiles(f);
  }

  return(
      <div className="form-list">
          <div>
            <button type="button" onClick={addStep}>Dodaj krok</button>
            <button type="button" onClick={deleteStep}>Usuń krok</button>
          </div>
          <form onSubmit={handleSubmit}>
              question:<input type="text" name="question" onChange={handleChange} required/>
              {inputs.steps.map((el, idx) => (
                <div>
                  <input type="text" name="content" onChange={(event) => handleArrayChange(event, idx)} required/>
                  <input type="text" name="currentSolution" onChange={(event) => handleArrayChange(event, idx)} required/>
                  <input type="text" name="answer" onChange={(event) => handleArrayChange(event, idx)} required/>
                  <input type="file" name="image" onChange={(event) => handleArrayChange(event, idx)}/>
                </div>
              ))}
              <div>Id wzorów</div>
              <div>Id wskazówek</div>
              <input type="submit" value="Upload"/>
          </form>
      </div>
  );

}

export default AddTaskForm;