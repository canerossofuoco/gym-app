import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Navbar from "../components/navbar";

function Profile() {
    const navigate = useNavigate();
    return (
        <>
        <div id="profileDiv" className="h-[91%]">
            <Button variant="destructive" onClick={ ()=>{
                localStorage.removeItem("cookie_id");
                localStorage.removeItem("cookie_email");
                navigate("/");
            }
            }>Esci</Button>
        </div>
        <Navbar/>
        </>
    );
}

export default Profile;