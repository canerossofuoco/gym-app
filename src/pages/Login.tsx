import { Input } from "../components/input"
import { Button } from "../components/button"
import { loginUser } from "../scripts/fetch"
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";


const Form = ()=> {
    const [cookie_id,setCookieId] = useLocalStorage("cookie_id", null);
    const [cookie_email,setCookieEmail] = useLocalStorage("cookie_email", null);
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [pswValue, setPswValue] = useState('');
    const [error,setError] = useState('');


    const handleEmail = (e:any) => {
        setEmailValue(e.target.value);
    };

    const handlePsw = (e:any) => {
        setPswValue(e.target.value);
    };

    async function sendForm(e:any) {
        e.preventDefault();
        setError("");
        var res = await loginUser(null,null,pswValue,emailValue);
        console.log(res);
        if(res["login"] && res["cookie_id"]!="" && res["cookie_email"]!="") {
            setCookieId(res["cookie_id"]);
            setCookieEmail(res["cookie_email"]);
            navigate("/home");
           //window.location.reload();
        }else {
            setError("User not found")
        }
    }


    return (
        <form action="" className="border w-4/5 rounded-xl p-7">
            <p className="text-xl mb-2 font-bold">Login</p>
            <Input type="text" placeholder="Username" className="mb-2" onChange={handleEmail}/>
            <Input type="password" placeholder="Password" className="mb-2" onChange={handlePsw}/>
            <p>{error}</p>
            <Button onClick={sendForm}>Login</Button>
            
            <a onClick={() => navigate("/register")} className="block mt-2 text-center hover:underline">Register</a>
        </form>
    )
}


function Login() {
    return (
        <div id="LoginDiv" className="h-full w-full flex items-center justify-center">
            <Form/>
        </div>
    );
}

export default Login;