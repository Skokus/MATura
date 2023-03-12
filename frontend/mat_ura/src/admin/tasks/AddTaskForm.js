import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { addTask } from '../../api/TaskService';
import Form from 'react-jsonschema-form';
import { addCategory } from '../../api/CategoryService';

function AddTaskForm(){

  const [inputs, setInputs] = useState({steps: []});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(inputs);
  }

  const handleArrayChange = (e, idx) => {
    var steps = inputs.steps.slice();
    steps[idx] = e.target.value;
    setInputs(values => ({...values, steps: steps}));
  }

  const addStep = () => {
    setInputs(values => ({...values, steps: [...inputs.steps, "lmao"]}));
  }

  const deleteStep = () => {
    var steps = inputs.steps.slice();
    steps.pop();
    setInputs(values => ({...values, steps: steps}));
  }

  return(
      <div className="form-list">
          <form onSubmit={handleSubmit}>
              name:<input type="text" name="name" onChange={handleChange} required/>
              <input type="submit" value="Upload"/>
              {inputs.steps.map((el, idx) => (
                <input key={idx} type="text" name={"step" + idx} onChange={(event) => handleArrayChange(event, idx)} required/>
              ))}
          </form>
          <button onClick={addStep}>Dodaj krok</button>
          <button onClick={deleteStep}>Usuń krok</button>
      </div>
  );

}

export default AddTaskForm;