import React, { useEffect,useState } from 'react';
import '../index.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
function Home() {
    return (
        <>
        <div id="HomeDiv" className="h-[91%] w-full ">   
        home
        </div>
        <Navbar/>
        </>
    );
}
export default Home;