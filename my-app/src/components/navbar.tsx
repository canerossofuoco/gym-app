import React, { useEffect,useState } from 'react';
import '../index.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
     //filtro da applciare per fare le icone bianche-> filter : invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
    var currentTheme = localStorage.getItem("theme");
    var cssImg = currentTheme==="light" ? "h-[70%] pb-[3%]" : "h-[70%] pb-[3%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";
    var selected = window.location.pathname;
    var css_selected = cssImg+" border-b-4 border-b-black";
    return (
      <div className="border h-[9%] flex justify-evenly items-center rounded-t-xl">
        <img className={selected==="/home" ? css_selected : cssImg} src="/images/house.png" onClick={()=>navigate("/home")} />
        <img className={selected==="/training" ? css_selected : cssImg} src="/images/man-lifting-weight.png" onClick={()=>navigate("/training")}/>
        <img className={selected==="/profile" ? css_selected : cssImg} src="/images/user.png" onClick={()=>navigate("/profile")} />
      </div>
    );
  }

  export default Navbar;