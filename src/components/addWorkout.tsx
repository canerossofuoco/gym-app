import { useNavigate } from "react-router-dom";

function AddWorkout() {

    const navigate = useNavigate();
     //filtro da applciare per fare le icone bianche-> filter : invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
    var currentTheme = localStorage.getItem("theme");
    var cssImg = currentTheme==="light" ? "h-[80%] pr-[2%] pt-[3%]" : "h-[80%] pr-[2%] pt-[3%] filter invert-[100%] sepia-[100%] saturate-[0%] hue-rotate-[288deg] brightness-[102%] contrast-[102%]";
    return (
        <>
            <p className="text-secondary-foreground font-bold pt-[5%] pl-[4%] text-xl"  >Create workout</p>
            <img className={cssImg} src="/images/add.png" />
        </>
    )
}

export default AddWorkout;