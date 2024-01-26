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


const App = () => {
  if(localStorage.getItem("loggato")=="1") {   //da sostituire con la jwt una volta fatta {
    return (
      <Login/>
    );
  } else {
    return (
      <Home/>
    );
  }
}

export default App;
