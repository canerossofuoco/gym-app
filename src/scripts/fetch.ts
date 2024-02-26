
import axios, { AxiosResponse } from "axios";

const urlServer = "localhost:80/index.php";

export async function addFood(id: any, email: any, c: any, p: any, f: any) {
    let res: any;

    const data = {
        cookie_id: id,
        cookie_email: email,
        carboidrati: c,
        proteine: p,
        grassi: f
    };

    await axios.post(urlServer + "/add/Food", data)
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}


export async function loginUser(id: any,email: string, psw: any, e: any, p: any ) {
    let res: any;

    const data = {
        cookie_id : id,
        cookie_email: email,
        email : e,
        password: psw
    };

    await axios.post(urlServer + "/loginUser", data)
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

    await axios.post(urlServer + "/request/Calories", data)
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function addWorkout(id: any, email: any, n: string) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email,
        nome: n
    };

    await axios.post(urlServer + "/add/workout", data)
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function addExercise(id: any, email: any, n: string) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email,
        nome: n
    };

    await axios.post(urlServer + "/add/exercise", data)
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}

export async function addExerciseToWorkout(id: any, email: any, n: string, n_e: string) {
    let res: any;

    const data = {
        cookie_id: "" + id,
        cookie_email: "" + email,
        nome: n,
        nome_esercizio: n_e
    };

    await axios.post(urlServer + "/add/exercise/workout", data)
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

    await axios.post(urlServer + "/request/profile", data)
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

    await axios.post(urlServer + "/request/workout", data)
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
        stringa_peso: s_p
    };

    await axios.post(urlServer + "/modify/exercise", data)
        .then((response: AxiosResponse) => {
            res = response.data;
        })
        .catch((error: any) => {
            console.error("Errore durante la richiesta:", error);
        });

    return res;
}
