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

const App = () => {
  const isUserLoggedIn = localStorage.getItem("loggato") === "giusto";
  return (
    <Routes>
    { isUserLoggedIn ? (<>
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