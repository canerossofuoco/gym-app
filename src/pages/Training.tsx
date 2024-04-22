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

    const [color, setColor] = useState('secondary');

    const [resultArray, setResultArray] = useState([]);

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

    return (
        <>
            <div id="trainingDiv" className="h-[91%] w-full p-[5%]">
                <Dialog>
                    <DialogTrigger className="bg-secondary border h-[10%] rounded-xl shadow-md flex justify-between w-full">
                        <AddWorkout />
                    </DialogTrigger>
                    <DialogContent className="rounded-xl h-[55%] overflow-x-hidden overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="h-[30%] flex">
                                <Input type="text" placeholder="Exercise Name" className="mb-2 h-10 w-[80%]" onChange={handleChange} />
                                <Button className="w-[20%] h-10">Done</Button>
                            </DialogTitle>
                            <DialogDescription className="h-[100%] w-[100%]">
                                
                                {resultArray.map((item, index) => (
                                    <>
                                    <div key={index} className={`h-[10%] border rounded-xl bg-${color} mt-[4%] justify-around flex`}>
                                        {/* @ts-ignore */}
                                        <p className="text-secondary-foreground font-bold pl-[1%] text-xl mt-[4%]" onClick={setColor("foreground")}>{item.name}</p>
                                    </div>
                                    
                                    </>
                                ))}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <Navbar />
        </>
    );
};

export default Training;
