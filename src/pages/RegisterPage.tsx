import { Input } from "../components/input"
import { Button } from "../components/button"
import { registerUser } from "../scripts/fetch"
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [ageValue, setAgeValue] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [error,setError] = useState('');

    const handleEmailChange = (e:any) => {
        setEmailValue(e.target.value);
    };

    const handlePasswordChange = (e:any) => {
        setPasswordValue(e.target.value);
    };

    const handleConfirmPasswordChange = (e:any) => {
        setConfirmPasswordValue(e.target.value);
    };

    const handleNameChange = (e:any) => {
        setNameValue(e.target.value);
    };

    const handleSurnameChange = (e:any) => {
        setSurnameValue(e.target.value);
    };

    const handleAgeChange = (e:any) => {
        setAgeValue(e.target.value);
    };

    const handleWeightChange = (e:any) => {
        setWeightValue(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let errors: string[] = [];
    
        if (passwordValue !== confirmPasswordValue) {
            errors.push("Passwords do not match");
        }
    
        if(emailValue === '' || passwordValue === '' || nameValue === '' || surnameValue === '' || ageValue === '' || weightValue === '') {
            errors.push("Compile all the fields");
        }
    
        if (errors.length > 0) {
            setError(errors.join(", "));
            return;
        }
    
        const userData = {
            email: emailValue,
            password: passwordValue,
            name: nameValue,
            surname: surnameValue,
            age: ageValue,
            weight: weightValue
        };
    
        const res = await registerUser(userData);
        console.log(res);
        if (res["register"] ) {
            navigate("/");
        } else {
            setError("Error during the registration");
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="border w-4/5 rounded-xl p-7">
            <p className="text-xl mb-2 font-bold">Register</p>
            <Input type="text" placeholder="Email" value={emailValue} onChange={handleEmailChange} className="mb-2" />
            <Input type="password" placeholder="Password" value={passwordValue} onChange={handlePasswordChange} className="mb-2" />
            <Input type="password" placeholder="Confirm Password" value={confirmPasswordValue} onChange={handleConfirmPasswordChange} className="mb-2" />
            <Input type="text" placeholder="Name" value={nameValue} onChange={handleNameChange} className="mb-2" />
            <Input type="text" placeholder="Surname" value={surnameValue} onChange={handleSurnameChange} className="mb-2" />
            <Input type="number" placeholder="Age" value={ageValue} onChange={handleAgeChange} className="mb-2" />
            <Input type="number" placeholder="Weight" value={weightValue} onChange={handleWeightChange} className="mb-2" />
            <p>{error}</p>
            <Button type="submit">Register</Button>
            <a onClick={() => navigate("/")} className="block mt-2 text-center hover:underline">Login</a>
        </form>
    );
};

const RegisterPage = () => {
    return (
        <div id="RegisterDiv" className="h-full w-full flex items-center justify-center">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
