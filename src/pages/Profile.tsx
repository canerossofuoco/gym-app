import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { requestProfile } from "../scripts/fetch";

function Profile() {

    const [profile, setProfile] = useState([]);

    useEffect(()=>{
        getProfile().then(response => {
            setProfile(response);
        })
    },[]);

    async function getProfile() {
        var res;
        res = requestProfile(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"));
        return res;
    }

    const navigate = useNavigate();

    var currentTheme = localStorage.getItem("theme");
    var cssImg = currentTheme==="light" ? "h-[30%] pt-[3%] pl-[3%]" : "pl-[3%] h-[30%] pt-[3%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";
    

    return (
        <>
        <div id="profileDiv" className="h-[91%] relative">
            <div className = " border bg-secondary rounded-xl absolute w-[90%] h-[35%] left-[5%] top-[5%] " id="ProfileCard" >
            <img className={cssImg} src="/images/user.png"/>
                <div>
                    {/*@ts-ignore*/}
                    <p className="text-4xl font-bold tracking-tight p-[5%]">{profile["nome"]}</p>
                    {/*@ts-ignore*/}
                    <p className="text-4xl font-bold tracking-tight p-[5%]">{profile["cognome"]}</p>
                </div>
            </div>
            <Button className = "left-[5%] absolute top-[45%] w-[90%] h-[7%]" variant="destructive" onClick={ ()=>{
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