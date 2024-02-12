import { Progress } from "./progress";


function CaloriesCard() {
    return ( 
        <div id="divCalories" className="w-full h-[33%] rounded-xl p-[4%] shadow-md border bg-secondary flex-col justify-between align-middle">
            <p className="text-secondary-foreground mb-2 font-bold"  >Calories</p>
            <Progress value={65}/>
            <div className=" pt-[6%]">
                <div className="p-[4%] flex ">
                    <p className="text-secondary-foreground font-bold pr-[2%]">C </p>
                    <div className="w-full pt-[3%] flex"><Progress value={70} className="w-2/3"/></div>
                </div>
                <div className="p-[4%] flex ">
                    <p className="text-secondary-foreground font-bold pr-[2%]">P</p>
                    <div className="w-full pt-[3%]"><Progress value={42} className="w-2/3"/></div>
                </div>
                <div className="p-[4%] flex ">
                    <p className="text-secondary-foreground font-bold pr-[2%]">F</p>
                    <div className="w-full pt-[3%]"><Progress value={10} className="w-2/3"/></div>
                </div>
            </div>
            {/* <p className="p-1">a</p>
            <p className="p-1">b</p>
            <p className="p-1">c</p> lol*/}
        </div>
    )
}

export default CaloriesCard;