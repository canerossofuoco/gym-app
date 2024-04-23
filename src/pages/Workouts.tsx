import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Navbar from "../components/navbar";
import {useLocation} from 'react-router-dom';

function Workouts() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
        <div id="workoutDiv" className="h-[91%]">
            <h1>{location.state.nome}</h1>
        </div>
        <Navbar/>
        </>
    );
}

export default Workouts;