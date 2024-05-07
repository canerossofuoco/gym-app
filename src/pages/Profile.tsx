import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Navbar from "../components/navbar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/card";

function Profile() {
    const navigate = useNavigate();
    return (
        <>
        <div id="profileDiv" className="h-[91%] relative">
            <div className = " border bg-secondary rounded-xl absolute w-[90%] h-[35%] left-[5%] top-[5%]" id="ProfileCard" >
            </div>
            <Button className = "absolute top-[50%] " variant="destructive" onClick={ ()=>{
                    localStorage.removeItem("cookie_id");
                    localStorage.removeItem("cookie_email");
                    window.location.reload();
                }
                }>Esci</Button>
        </div>
        <Navbar/>
        </>
    );
}
export default Profile;