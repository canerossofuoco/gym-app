import { Input } from "../components/input"
import { Button } from "../components/button"

const Form = ()=> {
    return (
        <form action="" className="border w-4/5 rounded-xl p-7">
            <p className="text-xl mb-2 font-bold">Login</p>
            <Input type="text" placeholder="Username" className="mb-2"/>
            <Input type="password" placeholder="Password" className="mb-2"/>
            <Button onClick={()=>localStorage.setItem("loggato","giusto")}>Accedi</Button>
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