import React, { useEffect,useState } from 'react';
import '../index.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card"
import { Button } from "../components/button"
import Register from "./Register"
import Profile from "./Profile"
import Training from "./Training"
import { useNavigate } from "react-router-dom"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';

const Home = () => {

    const Navbar = () => {
        
    }

    return ( 
        <div id="HomeDiv">   
        
        </div>
    );
}

export default Home;