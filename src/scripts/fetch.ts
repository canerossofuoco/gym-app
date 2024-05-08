
import axios, { AxiosResponse } from "axios";

const urlServer = "http://localhost:80/index.php";
const qs = require('qs');
export async function addFood(id: any, email: any, c: any, p: any, f: any, calories:any) {
    let res: any;
    const data = {
        cookie_id: id,
        cookie_email: email,
        carboidrati: c,
        proteine: p,
        grassi: f,
        calorie: calories
    };

    await axios.post(urlServer + "/add/Food", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}


export async function loginUser(id: any,email: any, psw: any, e: any ) {
    let res: any;
    const data = {
        cookie_id : id != null ? id : null,
        cookie_email: email,
        email : e,
        password: psw
    };
    
    await axios.post(urlServer + "/loginUser", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });
    return res;
}

export async function requestCalories(id: any, email: any) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email
    };

    await axios.post(urlServer + "/request/Calories", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}


export async function addExercisesToWorkout(id: any, email: any, arrayExercises:any , workoutName:string ) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email,
        nomeWorkout : "" + workoutName,
        exerciseArray: arrayExercises
    };

    await axios.post(urlServer + "/add/exercises/workout", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function requestProfile(id: any, email: any) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email
    };

    await axios.post(urlServer + "/request/profile", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function requestWorkout(id: any, email: any) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email
    };

    await axios.post(urlServer + "/request/workout", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function modifyExercise(id: any, email: any, n_e: string, s_p: string) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email,
        nome_esercizio: n_e,
        peso: s_p
    };

    await axios.post(urlServer + "/modify/exercise", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function requestExercises(id: any, email: any, nome:any) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email,
        nome_workout: "" + nome
    };

    await axios.post(urlServer + "/request/exercises", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function insertExerciseSet(id: any, email: any, nomeEsercizio: any, numSet: any, peso: any, repetitions:any) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email,
        nome_esercizio: "" + nomeEsercizio,
        num_set: "" + numSet,
        peso: "" + peso,
        repetitions: "" + repetitions
    };

    await axios.post(urlServer + "/add/exercise/set", qs.stringify(data))
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function modifyWeight(id:any, email:any, nuovoPeso:number) {
    let res;

    const data = {
        cookie_id: id,
        cookie_email: email,
        peso: nuovoPeso
    };

    try {
        const response = await axios.post(urlServer + "/modify/weight", qs.stringify(data));
        res = response.data;
    } catch (error) {
        console.error("Errore durante la richiesta:", error);
    }

    return res;
}


export async function registerUser(userData:any) {
    let res;

    try {
        const response = await axios.post(urlServer + "/register/user", qs.stringify(userData));
        res = response.data;
    } catch (error) {
        console.error("Errore durante la richiesta di registrazione:", error);
    }

    return res;
}
