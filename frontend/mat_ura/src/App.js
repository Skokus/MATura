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
import TagList from './formulas/TagList';
import FormulaList from './formulas/FormulaList';
export const UserContext = React.createContext();

function App() {

  const [token, setToken] = useState("");
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));
  const config = {
    loader: { load: ["input/asciimath"] }
  };

  const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/landing',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
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
            <Route path="/categories/:categoryName/:id" element={<Task/>}/>
            <Route path="/categories/:categoryName" element={<Tasklist/>}/>
            <Route path="/admin/tasks/add" element={<CreateTaskForm/>}/>
            <Route
              path="analytics"
              element={
                <ProtectedRoute
                  redirectPath="/home"
                  isAllowed={
                    !!user
                  }
                >
                  <CategoryList/>
                </ProtectedRoute>
              }
            />
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
          </Routes>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;
