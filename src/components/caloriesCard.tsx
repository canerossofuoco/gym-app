import { Progress } from "./progress";
import { requestCalories } from "../scripts/fetch";
import { useEffect, useState } from "react";




function CaloriesCard() {
    async function getData() {
        var cookie_id = localStorage.getItem("cookie_id");
        var cookie_email = localStorage.getItem("cookie_email");
        var res = await requestCalories(cookie_id,cookie_email);
        var dati = res["dati_kcal"];
        console.log(dati);
        setDataValue(dati);
        //console.log(dati["gCarboidrati"]);
    }
    // var dati = await getData();
    const [dataValue, setDataValue] = useState('');
    useEffect(() => { 
        getData()
      }, []);
      /*@ts-ignore */
      if(dataValue!=null) 
        return ( 
        <div id="divCalories" className="w-full h-[33%] rounded-xl p-[4%] shadow-md border bg-secondary flex-col justify-between align-middle">
            <p className="text-secondary-foreground mb-2 font-bold"  >Calories</p>
            { /*@ts-ignore */ }
            <Progress value={ (dataValue["calorie"]/3000) * 100}/>
            <div className=" pt-[6%]">
                <div className="p-[4%] flex ">
                    <p className="text-secondary-foreground font-bold pr-[2%]">C </p>
                    { /*@ts-ignore */ }
                    <div className="w-full pt-[3%] flex"><Progress value={(dataValue["gCarboidrati"]/300)*100} className="w-2/3"/></div>
                </div>
                <div className="p-[4%] flex ">
                    <p className="text-secondary-foreground font-bold pr-[2%]">P</p>
                    { /*@ts-ignore */ }
                    <div className="w-full pt-[3%]"><Progress value={(dataValue["gProteine"]/150)*100} className="w-2/3"/></div>
                </div>
                <div className="p-[4%] flex ">
                    <p className="text-secondary-foreground font-bold pr-[2%]">F</p>
                    { /*@ts-ignore */ }
                    <div className="w-full pt-[3%]"><Progress value={(dataValue["gGrassi"]/80)*100} className="w-2/3"/></div>
                </div>
            </div>
            {/* <p className="p-1">a</p>
            <p className="p-1">b</p>
            <p className="p-1">c</p> lol*/}
        </div>
    )
    else 
    return ( 
        <div id="divCalories" className="w-full h-[33%] rounded-xl p-[4%] shadow-md border bg-secondary flex-col justify-between align-middle">
            <p className="text-secondary-foreground mb-2 font-bold flex-col justify-center"  >NO DATA FOUND </p>
        </div>
    )
}

export default CaloriesCard;