import '../index.css';
import { Button } from "./button"
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Timer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
          const timerInterval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds === 59 ? 0 : prevSeconds + 1);
            if (seconds === 59) {
              setMinutes((prevMinutes) => prevMinutes === 59 ? 0 : prevMinutes + 1);
              if (minutes === 59) {
                setHours((prevHours) => prevHours + 1);
              }
            }
          }, 1000);
    
          return () => clearInterval(timerInterval);
      }, [hours, minutes, seconds]);

  return (
    <>
    <div className=" relative">
        <Button className="relative left-[35%] w-[30%]" onClick={ ()=>navigate("/") }>End workout</Button>
        <p className="relative left-[40%] w-[45%]  font-bold text-xl tracking-tight">{hours} : {minutes} : {seconds}</p>
    </div>
    </>
  );
};

export default Timer;