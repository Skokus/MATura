import Task from './task/Task'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Categories from './categories/Categories';
import Tasklist from './categories/Tasklist';
import MainNavbar from './MainNavbar';
import AboutPage from './aboutpage/AboutPage';

function App() {
  return (
    <div>
        <MainNavbar/>
        <Routes>
          <Route index element={<Categories/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="categories/:categoryName/:numberInCategory" element={<Task/>}/>
          <Route path="categories/:categoryName" element={<Tasklist/>}/>
        </Routes>
    </div>
  );
}

export default App;
