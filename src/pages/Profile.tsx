import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { modifyExercise, modifyWeight, requestProfile } from "../scripts/fetch";
import { useTheme } from "next-themes"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/dialog";
import { Label } from "../components/label";
import { Input } from "../components/input"
import { useLocalStorage } from "@uidotdev/usehooks";
function Profile() {

    const [profile, setProfile] = useState([]);
    const [weight,setWeight] = useState(-1);
    const { setTheme } = useTheme()
    const [cookie_id,setCookieId] = useLocalStorage("cookie_id", null);
    const [cookie_email,setCookieEmail] = useLocalStorage("cookie_email", null);

    useEffect(()=>{
        getProfile().then(response => {
            setProfile(response);
        })
    },[]);

    async function getProfile() {
        var res;
        res = requestProfile(cookie_id,cookie_email);
        return res;
    }

    const navigate = useNavigate();

    var currentTheme = localStorage.getItem("theme");
    var cssImg = currentTheme==="light" ? "h-[30%] pt-[3%] pl-[3%]" : "pl-[3%] h-[30%] pt-[3%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";
    
    function EditProfile() {
        var currentTheme = localStorage.getItem("theme");
        var cssImg = currentTheme==="light" ? "h-[80%] pr-[2%] pt-[3%]" : "h-[80%] pr-[2%] pt-[3%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";
        return (
            <div className="bg-secondary border mt-[7%] h-[10%] rounded-xl flex justify-between shadow-md absolute top-[40%] left-[5%] w-[90%]" >
                <p className="text-secondary-foreground font-bold pt-[6%] pl-[4%] text-xl"  >Edit profile</p>
                <img className={cssImg} src="/images/editing.png" />
            </div>
        )
    }

    function ChangeTheme() {
        var currentTheme = localStorage.getItem("theme");
        var cssImg = currentTheme==="light" ? "h-[80%] pr-[2%] pt-[3%]" : "h-[80%] pr-[2%] pt-[3%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";
        return (
            <div className="bg-secondary border mt-[7%] h-[10%] rounded-xl flex justify-between shadow-md absolute top-[53%] left-[5%] w-[90%]" onClick={() => {
                if(currentTheme==="light")
                    localStorage.setItem("theme","dark");
                else 
                    localStorage.setItem("theme","light");
                var theme:any = "dark";
                
                if(localStorage.getItem("theme"))
                    theme = localStorage.getItem("theme");
                setTheme(theme);
                navigate("/home");
            }}>
                <p className="text-secondary-foreground font-bold pt-[6%] pl-[4%] text-xl"  >Change Theme</p>
                <img className={cssImg} src="/images/night-mode.png" />
            </div>
        )
    }

    function handleWeightClick(e:any) {
        setWeight(e.target.value);
    }

   async function sendData() {
        var res = await modifyWeight(cookie_id,cookie_email,weight);
        console.log(res);
        getProfile().then(response => {
            setProfile(response);
        })
        navigate("/profile");
   }

    return (
        <>
        <div id="profileDiv" className="h-[91%] relative">
            <div className = " border bg-secondary rounded-xl absolute w-[90%] h-[35%] left-[5%] top-[5%] flex flex-wrap" id="ProfileCard" >
            <img className={cssImg} src="/images/user.png"/>
                <div className="relative left-[5%]">
                    {/*@ts-ignore*/}
                    <p className="text-4xl font-bold tracking-tight p-[5%]">{profile["nome"]}</p>
                    {/*@ts-ignore*/}
                    <p className="text-4xl font-bold tracking-tight p-[5%]">{profile["cognome"]}</p>
                    
                </div>
                <div className="absolute top-[40%] flex flex-wrap">
                        <p className="text-4xl font-bold tracking-tight p-[5%] relative left-[2%]">Età :</p>
                        {/*@ts-ignore*/}
                        <p className="text-4xl font-bold tracking-tight p-[5%]">{profile["eta"]}</p>
                        <p className="text-4xl font-bold tracking-tight p-[5%] relative left-[2%]">Peso :</p>
                        {/*@ts-ignore*/}
                        <p className="text-4xl font-bold tracking-tight p-[5%]">{profile["peso"]}</p>
                    </div>    
            </div>
            
            <Dialog>
            <DialogTrigger>
                <EditProfile/>
            </DialogTrigger>
            <DialogContent className="rounded-xl ">
                <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Weight" className="text-right">
                    Weight
                    </Label>
                    <Input id="Weight" type="number" className="col-span-3" onChange={handleWeightClick}/>
                </div>
                </div>
                <DialogFooter>
                <Button type="submit" onClick={sendData}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
            <Button className = "left-[5%] absolute top-[70%] w-[90%] h-[10%] font-bold text-xl" variant="destructive" onClick={ ()=>{
                    setCookieEmail(null);
                    setCookieId(null);
                    navigate("/");
                    //window.location.reload();
                }
                }>Logout</Button>
            <ChangeTheme />
        </div>
        <Navbar/>
        </>
    );
}
export default Profile;