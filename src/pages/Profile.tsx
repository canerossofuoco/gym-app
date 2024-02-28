import { Button } from "../components/button";
import Navbar from "../components/navbar";

function Profile() {
    return (
        <>
        <div id="profileDiv" className="h-[91%]">
            <Button variant="destructive" onClick={ ()=>{
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