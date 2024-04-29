import { useEffect, useState } from "react";
import { Input } from "../components/input"
import { getExerciseSets } from "../scripts/fetch";
import { Await } from "react-router-dom";

function ExerciseTable(props:any) {

    
    const [setsArray, setSetsArray] = useState({});  
    
    useEffect(()=> {
        console.log("reloadTable")
        const fetchData = async () => {
            //@ts-ignore
            var res;
            var temp:string = "";
            for (let index = 0; index < props.exArr.length; index++) {
                res = await getExerciseSets(localStorage.getItem("cookie_id"),localStorage.getItem("cookie_email"),props.exArr[index].nome);
                temp = props.exArr[index].nome;
                setSetsArray(prevState => ({
                    ...prevState,
                    //@ts-ignore
                    [temp]: res
                }));
            }
            //console.log("sono dentro"+setsArray);
          }
        
          
          fetchData()
            .catch(console.error);
    }, []);

    function mapExercises(item:any) {
        console.log(setsArray);
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
        {props.exArr.length > 0 ? ( 
        props.exArr.map(mapExercises)
        ) : (
            <></>
        )
        }   
        </>
    );
}

export default ExerciseTable;