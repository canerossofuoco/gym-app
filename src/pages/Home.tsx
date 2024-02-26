import React, { useEffect,useState } from 'react';
import '../index.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import CaloriesCard from '../components/caloriesCard';
import AddFoods from '../components/addFoods';
function Home() {
    return (
        <>
        <div id="HomeDiv" className="h-[91%] w-full p-[5%]">   
            <CaloriesCard/>
            <AddFoods/>
        </div>
        <Navbar/>
        </>
    );
}
export default Home;