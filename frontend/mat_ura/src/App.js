import React, {useState} from 'react';
import Task from './task/Task'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Categories from './categories/Categories';
import Tasklist from './categories/Tasklist';
import MainNavbar from './MainNavbar';
import AboutPage from './aboutpage/AboutPage';
import LoginPage from './loginpage/LoginPage';
import RegisterForm from './registerpage/RegisterForm';
import { MathJaxContext } from 'better-react-mathjax';
import CreateTaskForm from './admin/CreateTaskForm';
import CategoryList from './admin/categories/CategoryList';
import AddCategoryForm from './admin/categories/AddCategoryForm';
import AddTaskToCategoryForm from './admin/categories/AddTaskToCategoryForm';
import CategoryDetails from './admin/categories/CategoryDetails';
import TheoryCardList from './admin/theorycards/TheoryCardList';
export const UserContext = React.createContext();

function App() {

  const [token, setToken] = useState("");
  const config = {
    loader: { load: ["input/asciimath"] }
  };

  return (
    <MathJaxContext config={config}>
      <div>
        <UserContext.Provider value={{token, setToken}}>
          <MainNavbar/>
          <Routes>
            <Route index element={<Categories/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="categories/:categoryName/:id" element={<Task/>}/>
            <Route path="categories/:categoryName" element={<Tasklist/>}/>
            <Route path="admin/tasks/add" element={<CreateTaskForm/>}/>
            <Route path="admin/categories" element={<CategoryList/>}/>
            <Route path="admin/categories/add" element={<AddCategoryForm/>}/>
            <Route path="admin/categories/:categoryName" element={<CategoryDetails/>}/>
            <Route path="admin/categories/:categoryName/addTask" element={<AddTaskToCategoryForm/>}/>
            <Route path="admin/theory-cards" element={<TheoryCardList/>}/>
          </Routes>
        </UserContext.Provider>
      </div>
    </MathJaxContext>
  );
}

export default App;
