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

export const UserContext = React.createContext();

function App() {

  const [token, setToken] = useState("");

  return (
    <div>
      <UserContext.Provider value={{token, setToken}}>
        <MainNavbar/>
        <Routes>
          <Route index element={<Categories/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="categories/:categoryName/:numberInCategory" element={<Task/>}/>
          <Route path="categories/:categoryName" element={<Tasklist/>}/>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
