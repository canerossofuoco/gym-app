import { Input } from "../components/input"
import { Button } from "../components/button"
import { loginUser } from "../scripts/fetch"
import { useState } from "react";

const [emailValue, setEmailValue] = useState('');
const [pswValue, setPswValue] = useState('');

const handleEmail = (e:any) => {
    setEmailValue(e.target.value);
};

const handlePsw = (e:any) => {
    setPswValue(e.target.value);
};

function sendForm() {
    var res = loginUser(null,null,pswValue,emailValue);
    var array = Object.entries(res);
    for (const [key, value] of array) {
        if (key === 'cookie_id' || key === 'cookie_email'){
            localStorage.setItem(key,value);
        }
    }
    window.location.reload();
}

const Form = ()=> {
    return (
        <form action="" className="border w-4/5 rounded-xl p-7">
            <p className="text-xl mb-2 font-bold">Login</p>
            <Input type="text" placeholder="Username" className="mb-2" onChange={handleEmail}/>
            <Input type="password" placeholder="Password" className="mb-2" onChange={handlePsw}/>
            <Button onClick={()=>sendForm}>Accedi</Button>
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