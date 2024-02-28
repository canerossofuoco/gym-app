import React, { useEffect,useState } from 'react';
import './index.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/card"
import { Button } from "./components/button"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Training from "./pages/Training"
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import CaloriesPage from './pages/caloriesPage';
import { loginUser } from './scripts/fetch';

function login () {
  var cookie_id = localStorage.getItem("cookie_id");
  var cookie_email = localStorage.getItem("cookie_email");
  var res;
  var keyValueArray;
  var rtrn;
  if(cookie_id && cookie_email != null) {
      res = loginUser(cookie_id,cookie_email,"","");
      keyValueArray = Object.entries(res);
      for (const [key, value] of keyValueArray) {
          if (key === 'login'){
              return value;   
          }
      }
      return false;
  }
}

const App = () => {
  return (
    <Routes>
    { login() ? (<>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/training" element={<Training />} />
        <Route path="/caloriespage" element={<CaloriesPage />} />
        <Route path="*" element={<Home />} />
        </>) : 
        (<>
          <Route path="*" element={<Login />} />
        </>) 
    } 
    </Routes>
  );
};

export default App;