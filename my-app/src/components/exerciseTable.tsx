import { Input } from "../components/input"


function ExerciseTable(props:any) {
    return (
        <>
        <p className="text-xl mb-2 font-bold text-left">{props.name}</p>
        <table className="w-full ">
            <tr className="w-[25%]">
                <th className="font-bold text-xl m-[5%] w-[25%]">Set</th>
                <th className="font-bold text-xl m-[5%] w-[25%]">Previous</th>
                <th className="font-bold text-xl m-[5%] w-[25%]">Kg</th>
                <th className="font-bold text-xl m-[5%] w-[25%]">Reps</th>
            </tr>
            <tr>
                <td><Input/></td>
                <td></td>
                <td><Input/></td>
                <td><Input/></td>
            </tr>
            <tr>
            <td><Input/></td>
                <td></td>
                <td><Input/></td>
                <td><Input/></td>
            </tr>
            <tr>
                <td><Input/></td>
                <td></td>
                <td><Input/></td>
                <td><Input/></td>
            </tr>
            <tr>
                <td><Input/></td>
                <td></td>
                <td><Input/></td>
                <td><Input/></td>
            </tr>
        </table>
        </>
    );
}

export default ExerciseTable;