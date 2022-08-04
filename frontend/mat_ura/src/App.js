import Task from './task/Task'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Categories from './categories/Categories';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Categories/>}/>
          <Route path="tasks/:id" element={<Task task="./zadanie.json" completion="beingDone"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
