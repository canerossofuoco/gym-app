import { useNavigate } from "react-router-dom";

function AddFoods() {

    const navigate = useNavigate();
    //filtro da applciare per fare le icone bianche-> filter : invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
    var currentTheme = localStorage.getItem("theme");
    var cssImg = currentTheme==="light" ? "h-[80%] pr-[2%] pt-[3%]" : "h-[80%] pr-[2%] pt-[3%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";
    return (
        <div className="bg-secondary border mt-[7%] h-[10%] rounded-xl flex justify-between shadow-md">
            <p className="text-secondary-foreground font-bold pt-[5%] pl-[4%] text-xl"  >Add food</p>
            <img className={cssImg} src="/images/add.png" onClick={()=>navigate("/caloriespage")}/>
        </div>
    )
}

export default AddFoods;