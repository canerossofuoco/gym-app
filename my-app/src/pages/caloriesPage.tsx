import Navbar from "../components/navbar";
import { Input } from "../components/input"
import { Button } from "../components/button"
import { useRef, useState } from "react";
import axios from "axios";
import { Result } from "postcss";
function CaloriesPage() { 
    const [resultString, setResultString] = useState('');
    const [inputValue, setInputValue] = useState('');
    
    const handleChange = (e:any) => {
        setInputValue(e.target.value);
        var query = e.target.value;
        axios.get('https://api.api-ninjas.com/v1/nutrition?query=' + query, {
            headers: {
                'X-Api-Key' : 'tsv4HCj8ZF9s+WmuQ109YA==IsL2iFlLPI9xwQuT',
                'content-type': 'application/json',
            }
        })
        .then((res) => {
            res.data = JSON.stringify(res.data);
            var array = JSON.parse(res.data) as {
                    name: "brisket",
                    calories: 1312.3,
                    serving_size_g: 453.592,
                    fat_total_g: 82.9,
                    fat_saturated_g: 33.2,
                    protein_g: 132,
                    sodium_mg: 217,
                    potassium_mg: 781,
                    cholesterol_mg: 487,
                    carbohydrates_total_g: 0,
                    fiber_g: 0,
                    sugar_g: 0
            }[]
            var stringa = "";
            if(array.length!=0) {
                for(var i = 0; i<array.length;i++) {
                    stringa+='<div class="h-[10%] border rounded-xl bg-secondary mt-[4%] justify-around flex"> <p class="text-secondary-foreground font-bold pl-[1%] text-xl mt-[4%]">'+array[i].name+'</p> <p class="mt-[5%]">'+array[i].calories+'</p>  <p class="mt-[5%]">'+array[i].carbohydrates_total_g+'</p> <p class="mt-[5%]">'+array[i].protein_g+'</p> <p class="mt-[5%]">'+array[i].fat_total_g+'</p> </div>';
                }
                setResultString(stringa);
            } else 
                setResultString("");
        })
        .catch((err) => console.error(err));
    };

    return (
        <>
        <div id="caloriesPage" className="h-[91%] w-full p-[5%]">
            <Input type="text" placeholder="search" value={inputValue} onChange={handleChange} className="rounded-xl h-9 w-full mt-[2%] bg-secondary shadow-md"/> 
            <div className="h-[95%] p-[3%]" dangerouslySetInnerHTML={{ __html: resultString }}/>
        </div>
        <Navbar/>
        </>
    );
}

export default CaloriesPage;