import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Navbar from "../components/navbar";
import {useLocation} from 'react-router-dom';
import { requestExercises } from "../scripts/fetch";
import { request } from "http";
import ExerciseTable from "../components/exerciseTable";
import { useEffect, useState } from "react";

function Workouts() {
    const navigate = useNavigate();
    const location = useLocation();
    const [exercisesArray, setExerciseArray] = useState([]);

    useEffect(() => {
        console.log("reload")
        getExercises();
    }, []);

    var currentTheme = localStorage.getItem("theme");
    var cssImg = currentTheme==="light" ? "h-[40%] pr-[2%] " : "h-[40%] pr-[2%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";

    async function getExercises() {
        var res = await requestExercises(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"),location.state.nome);
        res = res["exercises"];
        setExerciseArray(res);
        console.log(res);
    }

    return (
        <>
        <div id="workoutDiv" className="h-[91%] overflow-x-hidden overflow-y-auto p-2">
            <div className="flex h-[20%] rounded-xl justify-between">
                <h1 className="text-4xl font-bold tracking-tight p-[10%]">{location.state.nome}</h1>
                <img className={cssImg+" mt-[4%] "} src="/images/cross.png" onClick={()=>navigate("/")}/>
            </div>
            <div className="">
                <ExerciseTable exArr={exercisesArray} />
            </div>
        </div>
        <Navbar/>
        </>
    );
}

export default Workouts;