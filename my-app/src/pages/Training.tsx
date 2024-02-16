import AddWorkout from "../components/addWorkout";
import Navbar from "../components/navbar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/dialog"
import { Button } from "../components/button";
import { Input } from "../components/input"
import { useState } from "react";
import axios from "axios";
import { Await } from "react-router-dom";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function Training () {

    const [resultString, setResultString] = useState('');
    const [inputValue, setInputValue] = useState('');

    async function handleChange (e:any) {
        setInputValue(e.target.value);
        var query = e.target.value;
        await delay(1000);
        axios.get('https://api.api-ninjas.com/v1/exercises?muscle=' + query, {
            headers: {
                'X-Api-Key' : 'tsv4HCj8ZF9s+WmuQ109YA==IsL2iFlLPI9xwQuT',
                'content-type': 'application/json',
            }
        })
        .then((res) => {
            res.data = JSON.stringify(res.data);
            var array = JSON.parse(res.data) as {
                name: "Incline Hammer Curls",
                type: "strength",
                muscle: "biceps",
                equipment: "dumbbell",
                difficulty: "beginner",
                instructions: "Prova"
            }[]
            var stringa = "";
            if(array.length!=0) {
                for(var i = 0; i<array.length;i++) {
                    stringa+='<div class="h-[10%] border rounded-xl bg-secondary mt-[4%] justify-around flex"> <p class="text-secondary-foreground font-bold pl-[1%] text-xl mt-[4%]">'+array[i].name+'</p> </div>';
                }
                setResultString(stringa);
            } else 
                setResultString("");
        })
        .catch((err) => console.error(err));
    }

    return (
        <>
        <div id="trainingDiv" className="h-[91%] w-full p-[5%]">
        <Dialog>
            <DialogTrigger className="bg-secondary border h-[10%] rounded-xl shadow-md flex justify-between w-full"> <AddWorkout/> </DialogTrigger>
            <DialogContent className="rounded-xl h-[55%] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                <DialogTitle  className="h-[30%]"> 
                    <Input type="text" placeholder="ExerciseName" className="mb-2 h-10" onChange={handleChange}/>  
                </DialogTitle>
                <DialogDescription  dangerouslySetInnerHTML={{ __html: resultString }}>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </div>
        <Navbar/>
        </>
    );
}

export default Training;