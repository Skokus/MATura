import React, { useState } from 'react';
import { addTask } from '../../api/TaskService';
import { postPhoto } from '../../api/PhotoService';
import "../formstyle.css"
import { connect } from 'react-redux';

function AddTaskForm(props){

  const [inputs, setInputs] = useState({steps: [{abcAnswers:[]}]});
  const [theoryCards, setTheoryCards] = useState([]);
  const [tips, setTips] = useState([]);
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
    const ids = await postPhoto(props.token, fileData);
    for(let i = 0; i < ids.length; i++){
      steps[i].imageId = ids[i];
    }
    setInputs(values => ({...values, steps: steps}));
    inputs.tips = tips;
    inputs.theoryCards = theoryCards;
    addTask(props.token, inputs);
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

  const onAddStepClicked = () => {
    setInputs(values => ({...values, steps: [...inputs.steps, {abcAnswers:[]}]}));
    setFiles(values => ([...values, null]));
  }

  const onDeleteStepClicked = () => {
    var steps = inputs.steps.slice();
    var f = files.slice();
    steps.pop();
    f.pop();
    setInputs(values => ({...values, steps: steps}));
    setFiles(f);
  }

  const handleTheoryCardChange = (e, idx) => {
    var tcs = theoryCards.slice();
    tcs[idx] = e.target.value;
    setTheoryCards(tcs);
  }

  const onAddTheoryCardClicked = () => {
    setTheoryCards(values => ([...values, ""]));
  }

  const onDeleteTheoryCardClicked = () => {
    var tc = theoryCards.slice();
    tc.pop();
    setTheoryCards(tc);
  }

  const handleTipChange = (e, idx) => {
    var ts = tips.slice();
    ts[idx] = e.target.value;
    setTips(ts);
  }

  const onAddTipClicked = () => {
    setTips(values => ([...values, ""]));
  }

  const onDeleteTipClicked = () => {
    var t = tips.slice();
    t.pop();
    setTips(t);
  }

  const handleABCAnswerChange = (e, idx, n) => {
    inputs.steps[idx].abcAnswers[n] = e.target.value;
  }

  const onAddABCAnswerClicked = (idx) => {
    const clone = structuredClone(inputs);
    clone.steps[idx].abcAnswers.push("");
    console.log(clone.steps[idx].abcAnswers);
    setInputs(clone);
  }

  return(
      <div className="form">
          <div className="form-header">Dodaj zadanie</div>
          <div>
            <button type="button" className="form-util-button form-add-button" onClick={onAddStepClicked}>Dodaj krok</button>
            <button type="button" className="form-util-button form-delete-button" onClick={onDeleteStepClicked}>Usuń krok</button>
            <button type="button" className="form-util-button form-add-button" onClick={onAddTheoryCardClicked}>Dodaj wzór</button>
            <button type="button" className="form-util-button form-delete-button" onClick={onDeleteTheoryCardClicked}>Usuń wzór</button>
            <button type="button" className="form-util-button form-add-button" onClick={onAddTipClicked}>Dodaj wskazówkę</button>
            <button type="button" className="form-util-button form-delete-button" onClick={onDeleteTipClicked}>Usuń wskazówkę</button>
          </div>
          <form onSubmit={handleSubmit}>
              <label for="question" className="form-input-label">Pytanie:</label><input type="text" className="form-input-text" name="question" onChange={handleChange} required/>
              {inputs.steps.map((el, idx) => (
                <div>
                  <label for="question" className="form-input-label">Krok {idx+1}</label>
                  <label for="content" className="form-input-label">Treść:</label><input type="text" className="form-input-text" name="content" onChange={(event) => handleArrayChange(event, idx)} required/>
                  <label for="currentSolution" className="form-input-label">Obecny stan rozwiązania:</label><input type="text" className="form-input-text" name="currentSolution" onChange={(event) => handleArrayChange(event, idx)} required/>
                  <label for="image" className="form-input-label">Obecny stan rozwiązania (Zdjęcie)</label><input type="file" className="form-input-file" name="image" onChange={(event) => handleArrayChange(event, idx)}/>
                  <label for="answer" className="form-input-label">Odpowiedź:</label><input type="text" className="form-input-text" name="answer" onChange={(event) => handleArrayChange(event, idx)} required/>
                  <label for="abcAnswers" className="form-input-label">Odpowiedzi testowe:</label>
                  <div>
                  {inputs.steps[idx].abcAnswers.map((el, n) => (
                    <input type="text" className="form-input-text" name="theorycard" onChange={(event) => handleABCAnswerChange(event, idx, n)} required/>
                  ))}
                  </div>
                  <button type="button" className="form-util-button form-add-button" onClick={() => onAddABCAnswerClicked(idx)}>Dodaj zamkniętą odpowiedź</button>
                </div>
              ))}
              <div>Id wzorów</div>
              {theoryCards.map((el, idx) => (
                <input type="text" name="theorycard" className="form-input-text" onChange={(event) => handleTheoryCardChange(event, idx)} required/>
              ))}
              <div>Id wskazówek</div>
              <table>
              {tips.map((el, idx) => (
                <input type="text" name="theorycard" className="form-input-text" onChange={(event) => handleTipChange(event, idx)} required/>
              ))}
              </table>
              <div><input type="submit" className="form-input-submit" value="Wyślij"/></div>
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


export default connect(mapStateToProps, null) (AddTaskForm);