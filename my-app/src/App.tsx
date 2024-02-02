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
import { Navigate } from 'react-router-dom';

const App = () => {
  console.log(localStorage.getItem("loggato"));
  const isUserLoggedIn = localStorage.getItem("loggato") === "giusto";
  return (
    isUserLoggedIn ? <Navigate to="/" replace ={true} /> : <Navigate to="/login" replace ={true} />
  );
};

export default App;