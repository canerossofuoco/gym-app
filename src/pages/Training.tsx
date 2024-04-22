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
import { useEffect, useState } from "react";
import axios from "axios";
import { addExercise,addExerciseToWorkout,addWorkout,requestWorkout } from "../scripts/fetch";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function Training () {

    useEffect(() => {
        setClickedExercises([]);
    }, []);

    const [workoutname, setWorkoutname] = useState('');

    const [color, setColor] = useState('secondary');

    const [resultArray, setResultArray] = useState([]);

    const [clickedExercises, setClickedExercises] = useState([]);

    const handleChange = async (e:any) => {
        const query = e.target.value;
        await delay(1000);

        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${query}`, {
                headers: {
                    'X-Api-Key': 'tsv4HCj8ZF9s+WmuQ109YA==IsL2iFlLPI9xwQuT',
                    'Content-Type': 'application/json',
                }
            });
            const dataArray = response.data;

            if (dataArray.length > 0) {
                setResultArray(dataArray);
            } else {
                setResultArray([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    function handleNameChange(e:any) {
        setWorkoutname(e.target.value);
    }

    function handleItemClick(id:any,name:any) {
        //console.log(document.getElementById(id));
        /* @ts-ignore */
        document.getElementById(id).style.backgroundColor = "dodgerblue";
        /* @ts-ignore */
        setClickedExercises([...clickedExercises, name]);
    }

    function CreateWorkoutPopUp() {
        return (
            <Dialog>
                    <DialogTrigger className="bg-secondary border h-[10%] rounded-xl shadow-md flex justify-between w-full">
                        <AddWorkout />
                    </DialogTrigger>
                    <DialogContent className="rounded-xl h-[55%] overflow-x-hidden overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="h-[30%] flex">
                                <Input type="text" placeholder="Workout Name" className="mb-2 h-10 w-[80%]" onChange={handleNameChange}/>
                                <Input type="text" placeholder="Muscle worked" className="mb-2 h-10 w-[80%]" onChange={handleChange} />
                                <Button className="w-[20%] h-10" onClick={ async () => {
                                    var res;
                                    await addWorkout(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"),workoutname)
                                    for (let index = 0; index < clickedExercises.length; index++) {
                                        await addExercise(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"),clickedExercises[index]);
                                        res = await addExerciseToWorkout(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"),workoutname,clickedExercises[index]);
                                    }
                                    if(res["inserimento"]) {
                                        
                                    }
                                }}>Done</Button>
                            </DialogTitle>
                            <DialogDescription className="h-[100%] w-[100%]">
                                
                                {resultArray.map((item, index) => (
                                    <>
                                    <div key={index} id={""+index} className={`h-[10%] border rounded-xl bg-secondary mt-[4%] justify-around flex`}>
                                        {/* @ts-ignore */}
                                        <p className="text-secondary-foreground font-bold pl-[1%] text-xl mt-[4%]" onClick={() =>   handleItemClick(index,item.name)}  >{item.name}</p>
                                    </div>
                                    
                                    </>
                                ))}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
        );
    }
    return (
        <>
            <div id="trainingDiv" className="h-[91%] w-full p-[5%]">
                <CreateWorkoutPopUp/>
                <LoadWorkout/>
            </div>
            <Navbar />
        </>
    );
};

export default Training;
