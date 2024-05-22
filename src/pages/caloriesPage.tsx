import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Input } from "../components/input"
import axios from 'axios';
import { addFood } from "../scripts/fetch"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/dialog"
import { useLocalStorage } from '@uidotdev/usehooks';

interface FoodItem {
    name: string;
    calories: number;
    carbohydrates_total_g: number;
    protein_g: number;
    fat_total_g: number;
}

const CaloriesPage: React.FC = () => {
    const [resultArray, setResultArray] = useState<FoodItem[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [cookie_id,setCookieId] = useLocalStorage("cookie_id", null);
    const [cookie_email,setCookieEmail] = useLocalStorage("cookie_email", null);

    async function handleClick (calories: number, carbo: number, protein: number, fat: number) {
        console.log(calories, carbo, protein, fat);
        var res = await addFood(cookie_id,cookie_email,carbo,protein,fat,calories);
        console.log(res);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInputValue(query);

        try {
            const response = await axios.get<FoodItem[]>(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
                headers: {
                    'X-Api-Key': 'tsv4HCj8ZF9s+WmuQ109YA==IsL2iFlLPI9xwQuT',
                    'Content-Type': 'application/json',
                }
            });

            setResultArray(response.data);
        } catch (error) {
            console.error('Errore nella chiamata API:', error);
        }
    };

    return (
        <>
            <div id="caloriesPage" className="h-[91%] w-full p-[5%]">
                <Input
                    type="text"
                    placeholder="search"
                    value={inputValue}
                    onChange={handleChange}
                    className="rounded-xl h-9 w-full mt-[2%] bg-secondary shadow-md"
                />
                <div className="h-[95%] p-[3%] overflow-x-hidden overflow-y-auto">
                {resultArray.map((item) => (
                    <>
                     <Dialog>
                        <DialogTrigger className="h-[10%] rounded-xl bg-secondary mt-[4%] justify-around flex w-[100%]" onClick={() => handleClick(item.calories, item.carbohydrates_total_g, item.protein_g, item.fat_total_g)}> 
                            <p className="text-secondary-foreground font-bold pl-[1%] text-xl mt-[4%]">{item.name}</p>
                            <p className="mt-[5%]">{item.calories}</p>
                            <p className="mt-[5%] ">{item.carbohydrates_total_g}</p>
                            <p className="mt-[5%] ">{item.protein_g}</p>
                            <p className="mt-[5%]">{item.fat_total_g}</p>    
                        </DialogTrigger>
                         <DialogContent  className="rounded-xl ">
                             <DialogHeader>
                             <DialogTitle> 
                                <p className="text-secondary-foreground mb-2 font-bold"  >Added</p>
                             </DialogTitle>
                             <DialogDescription>
                             </DialogDescription>
                             </DialogHeader>
                         </DialogContent>
                     </Dialog>
                     </>
                    ))}
                </div>
            </div>
            <Navbar />
        </>
    );
};

export default CaloriesPage;
