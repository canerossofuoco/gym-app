import { Input } from "../components/input"
import { Button } from "../components/button"
import { loginUser } from "../scripts/fetch"
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';


const Form = ()=> {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [pswValue, setPswValue] = useState('');

    const handleEmail = (e:any) => {
        setEmailValue(e.target.value);
    };

    const handlePsw = (e:any) => {
        setPswValue(e.target.value);
    };

    async function sendForm(e:any) {
        e.preventDefault();
        var res = await loginUser(null,null,pswValue,emailValue);
        if(res["login"] && res["cookie_id"]!="" && res["cookie_email"]!="") {
            localStorage.setItem("cookie_id",res["cookie_id"]);
            localStorage.setItem("cookie_email",res["cookie_email"]);
        }
        // navigate("/");
        window.location.reload();
    }


    return (
        <form action="" className="border w-4/5 rounded-xl p-7">
            <p className="text-xl mb-2 font-bold">Login</p>
            <Input type="text" placeholder="Username" className="mb-2" onChange={handleEmail}/>
            <Input type="password" placeholder="Password" className="mb-2" onChange={handlePsw}/>
            <Button onClick={sendForm}>Accedi</Button>
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