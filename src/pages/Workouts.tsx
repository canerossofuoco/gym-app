import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Navbar from "../components/navbar";
import {useLocation} from 'react-router-dom';
import { getExerciseSets, requestExercises } from "../scripts/fetch";
import { useEffect, useState } from "react";
import { Input } from "../components/input";
import { number } from "zod";

function Workouts() {
    const navigate = useNavigate();
    const location = useLocation();
    const [exerciseArray, setExerciseArray] = useState([]);
    
    useEffect(() => {
        console.log("reloadWorkout")
        
        getExercises().then(response => {
            setExerciseArray(response);
        })
    }, []);


    async function getExercises() {
        var res = await requestExercises(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"),location.state.nome);
        return res["exercises"];
    }

    var currentTheme = localStorage.getItem("theme");
    var cssImg = currentTheme==="light" ? "h-[40%] pr-[2%] " : "h-[40%] pr-[2%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";


    function parseCSV(csvString:any) {
        // Separiamo la stringa CSV in righe
        const rows = csvString.split('\n');
        
        // Inizializziamo un array per contenere i risultati
        const result:any = [];
    
        // Iteriamo attraverso ogni riga
        //@ts-ignore
        rows.forEach(row => {
            // Separiamo la riga in colonne
            const columns = row.split(',');
            
            // Aggiungiamo le colonne all'array dei risultati
            result.push(columns);
        });
    
        return result;
    }

    function mapExercises(item:any,index:any) {
        
        var num = 0;
        if(item.peso!=null) 
            num = item.peso.length
        console.log(item.nome+" "+item.peso);

        console.log(num);
        //console.log(item.nome+" "+num);
        return (
            <>
            <div key={index}>
                <div className="border rounded-xl bg-secondary">  
                    <p className="text-xl mb-2 font-bold text-left ml-[10%]">{item.nome}</p>
                    <table className="w-full">
                        <tr className="w-[25%]">
                            <th className="font-bold text-xl m-[5%] w-[25%]">Set</th>
                            <th className="font-bold text-xl m-[5%] w-[25%]">Previous</th>
                            <th className="font-bold text-xl m-[5%] w-[25%]">Kg</th>
                            <th className="font-bold text-xl m-[5%] w-[25%]">Reps</th>
                        </tr>
                    {
                        num > 0  ? ( 
                            parseCSV(""+item.peso)[0].map((item:any,index:any) => {
                                return (
                                    <tr>
                                        <td className="font-bold text-center">{index+1}</td>
                                        <td className="font-bold text-center">{item+"Kg"}</td>
                                        <td><Input className="bg-background rounded-xl"/></td>
                                        <td><Input className="bg-background rounded-xl"/></td>
                                    </tr>
                                )
                            })
                        ) : (
                            <></>
                        )
                    }
                    </table>
                </div>
                <br/>
            </div>
            </>
        );
        
    }

    return (
        <>
        <div id="workoutDiv" className="h-[91%] overflow-x-hidden overflow-y-auto p-2">
            <div className="flex h-[20%] rounded-xl justify-between">
                <h1 className="text-4xl font-bold tracking-tight p-[10%]">{location.state.nome}</h1>
                <img className={cssImg+" mt-[4%] "} src="/images/cross.png" onClick={()=>navigate("/")}/>
            </div>
            <div className="">
            {exerciseArray.length > 0  ? ( 
                exerciseArray.map(mapExercises)
                ) : (
                <></>
                )
            }
            </div>
        </div>
        <Navbar/>
        </>
    );
}

export default Workouts;