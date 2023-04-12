import React, {useState} from 'react';
import Task from './task/Task'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Categories from './categories/Categories';
import Tasklist from './categories/Tasklist';
import MainNavbar from './MainNavbar';
import AboutPage from './aboutpage/AboutPage';
import LoginPage from './loginpage/LoginPage';
import RegisterForm from './registerpage/RegisterForm';
import { MathJaxContext } from 'better-react-mathjax';
import CreateTaskForm from './admin/tasks/AddTaskForm';
import CategoryList from './admin/categories/CategoryList';
import AddCategoryForm from './admin/categories/AddCategoryForm';
import AddTaskToCategoryForm from './admin/categories/AddTaskToCategoryForm';
import CategoryDetails from './admin/categories/CategoryDetails';
import TheoryCardList from './admin/theorycards/TheoryCardList';
import AddTheoryCardForm from './admin/theorycards/AddTheoryCardForm';
import TheoryCardDetails from './admin/theorycards/TheoryCardDetails';
import EditTheoryCardForm from './admin/theorycards/EditTheoryCardForm';
import TipList from './admin/tips/TipList';
import AddTipForm from './admin/tips/AddTipForm';
import EditTipForm from './admin/tips/EditTipForm';
import TaskList from './admin/tasks/TaskList';
import AddTaskForm from './admin/tasks/AddTaskForm';
import FormulaList from './formulas/FormulaList';
import {connect} from "react-redux";
import TaskDetails from './admin/tasks/TaskDetails';
import RegisterConfirm from './RegisterConfirm';
import EditTaskForm from './admin/tasks/EditTaskForm';
import EmailSentInfo from './registerpage/EmailSentInfo';
import UserList from './admin/users/UserList';
import AddUserForm from './admin/users/AddUserForm';
export const UserContext = React.createContext();

function App() {

  const config = {
    loader: { load: ["input/asciimath"] }
  };

  return (
    <MathJaxContext config={config}>
      <div className="app-wrapper">
        <MainNavbar className="app-navbar"/>
        <div className="app-navbar"></div>
        <div className="app-mainpage">
          <Routes>
            <Route index element={<Categories/>}/>
            <Route path="/formulas" element={<FormulaList/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/emailSent" element={<EmailSentInfo/>}/>
            <Route path="/confirm/:registerToken" element={<RegisterConfirm/>}/>
            <Route path="/categories/:categoryName/:id" element={<Task isDaily={false}/>}/>
            <Route path="/dailyTask" element={<Task isDaily={true}/>}/>
            <Route path="/categories/:categoryName" element={<Tasklist/>}/>
            <Route path="/admin/tasks/add" element={<CreateTaskForm/>}/>
            <Route path="/admin/categories" element={<CategoryList/>}/>
            <Route path="/admin/categories/new" element={<AddCategoryForm/>}/>
            <Route path="/admin/categories/:categoryName" element={<CategoryDetails/>}/>
            <Route path="/admin/categories/:categoryName/addTask" element={<AddTaskToCategoryForm/>}/>
            <Route path="/admin/theory-cards" element={<TheoryCardList/>}/>
            <Route path="/admin/theory-cards/new" element={<AddTheoryCardForm/>}/>
            <Route path="/admin/theory-cards/:theoryCardId" element={<TheoryCardDetails/>}/>
            <Route path="/admin/theory-cards/:theoryCardId/edit" element={<EditTheoryCardForm/>}/>
            <Route path="/admin/tips" element={<TipList/>}/>
            <Route path="/admin/tips/new" element={<AddTipForm/>}/>
            <Route path="/admin/tips/:tipId/edit" element={<EditTipForm/>}/>
            <Route path="/admin/tasks" element={<TaskList/>}/>
            <Route path="/admin/tasks/new" element={<AddTaskForm/>}/>
            <Route path="/admin/tasks/:taskId" element={<TaskDetails/>}/>
            <Route path="/admin/tasks/:taskId/edit" element={<EditTaskForm/>}/>
            <Route path="/admin/users" element={<UserList/>}/>
            <Route path="/admin/users/new" element={<AddUserForm/>}/>
          </Routes>
        </div>
      </div>
    </MathJaxContext>
  );
}

const mapStateToProps = (state) => {
  return{
      userLogged: state.userLoggedIn,
      token: state.token
  }
}

export default connect(mapStateToProps, null) (App)
