import { useEffect, useState } from "react";
import { Input } from "../components/input"
import { getExerciseSets } from "../scripts/fetch";
import { Await } from "react-router-dom";

type Esercizi = Array<{
    nome:string;
    sets:Array<{
        num_set:string;
        peso:number;
    }>
}>

function ExerciseTable(props:any) {

    //sei un coglione perchè continuavi ad aggiornare l'hook un po alla volta e partiva array.map con i dati parziali
    //sei un colgione perchè non entrava nell useEffect 
    const [setsArray, setSetsArray] = useState({});  
    
    useEffect(()=> {
        fetchData()
    }, []);

    async function fetchData() {
        var res:any;
        for (let index = 0; index < props.exArr.length; index++) {
            res = await getExerciseSets(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"),props.exArr[index].nome);
            console.log(res);
        }
      }
    
    function mapExercises(item:any,index:any) {
        console.log(setsArray)
        //@ts-ignore
        const array = setsArray[item.nome+""];
        return (
            <>
            <div className="border rounded-xl bg-secondary">  
            <p className="text-xl mb-2 font-bold text-left ml-[10%]">{item.nome}</p>
            <table className="w-full">
                <tr className="w-[25%]">
                    <th className="font-bold text-xl m-[5%] w-[25%]">Set</th>
                    <th className="font-bold text-xl m-[5%] w-[25%]">Previous</th>
                    <th className="font-bold text-xl m-[5%] w-[25%]">Kg</th>
                    <th className="font-bold text-xl m-[5%] w-[25%]">Reps</th>
                </tr>
                {array["exercise_sets"] != "null" ? 
                (<>

                </>) :
                
                (<>
                </>) } 
                <tr>
                    <td className="font-bold text-center">1</td>
                    <td></td>
                    <td><Input/></td>
                    <td><Input/></td>
                </tr>
                <tr>
                    <td className="font-bold text-center">2</td>
                    <td></td>
                    <td><Input/></td>
                    <td><Input/></td>
                </tr>
                <tr>
                    <td className="font-bold text-center">3</td>
                    <td></td>
                    <td><Input/></td>
                    <td><Input/></td>
                </tr>
                <tr>
                    <td className="font-bold text-center">4</td>
                    <td></td>
                    <td><Input/></td>
                    <td><Input/></td>
                </tr>
            </table>
            </div>
            <br/>
            </>
            );
    }
    

    return (
        <>
        {props.exArr.length > 0 && Object.keys(setsArray).length > 0 ? ( 
        props.exArr.map(mapExercises)
        ) : (
            <></>
        )
        }   
        </>
    );
}

export default ExerciseTable;