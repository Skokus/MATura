import Task from './task/Task'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Categories from './categories/Categories';
import Tasklist from './categories/Tasklist';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Categories/>}/>
          <Route path="categories/:categoryName/:numberInCategory" element={<Task task="./zadanie.json"/>}/>
          <Route path="categories/:categoryName" element={<Tasklist/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
