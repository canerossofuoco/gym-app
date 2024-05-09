const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5432;
const { Pool } = require('pg');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'gym_app',
    password: '',
    port: 3306,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 20000
});


app.post('/add/Food', addFood);
app.post('/loginUser', loginUser);
app.post('/request/Calories', requestCalories);
app.post('/add/exercises/workout', addExercisesToWorkout);
app.post('/request/profile', requestProfile);
app.post('/request/workout', requestWorkout);
app.post('/modify/exercise', modifyExercise);
app.post('/request/exercises', requestExercises);
app.post('/add/exercise/set', insertExerciseSet);
app.post('/modify/weight', modifyWeight);
app.post('/register/user',registerUser);


async function verifyCookie(cookieId, cookieEmail) {
    try {
        const query = 'SELECT * FROM cookie WHERE id = $1 AND email = $2';
        const result = await pool.query(query, [cookieId, cookieEmail]);
        return result.rows.length === 1;
    } catch (error) {
        console.error('Error verifying cookie:', error);
        return false;
    }
}

async function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (req.cookies.cookie_id && req.cookies.cookie_email) {
            const cookieId = req.cookies.cookie_id;
            const cookieEmail = req.cookies.cookie_email;
            const cookieVerified = await verifyCookie(cookieId, cookieEmail);
            if (cookieVerified) {
                return res.json({ login: true });
            }
        } else {
            const query = 'SELECT * FROM utenti WHERE email = $1 AND psw = $2';
            const result = await pool.query(query, [email, password]);
            
            if (result.rows.length === 1) {
                const user = result.rows[0];
                const rand = Math.floor(Math.random() * 9000) + 1000;
                const insertQuery = 'INSERT INTO cookie (id, email) VALUES ($1, $2)';
                await pool.query(insertQuery, [rand, user.email]);
                
                res.cookie('cookie_id', rand);
                res.cookie('cookie_email', user.email);
                return res.json({ login: true, cookie_id: rand, cookie_email: user.email });
            } else {
                return res.json({ login: false });
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function addFood(req, res) {
    const carboidrati = req.body.carboidrati;
    const proteine = req.body.proteine;
    const grassi = req.body.grassi;
    const calorie = req.body.calorie;
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;
            const query = `SELECT * FROM dati_kcal WHERE email_utente = $1 AND giorno = CURRENT_DATE`;
            const result = await pool.query(query, [email]);
            
            if (result.rows.length === 1) {
                const updateQuery = `UPDATE dati_kcal 
                                     SET calorie = calorie + $1, gCarboidrati = gCarboidrati + $2, 
                                         gProteine = gProteine + $3, gGrassi = gGrassi + $4 
                                     WHERE giorno = CURRENT_DATE AND email_utente = $5`;
                await pool.query(updateQuery, [calorie, carboidrati, proteine, grassi, email]);
            } else {
                const insertQuery = `INSERT INTO dati_kcal (calorie, gCarboidrati, gProteine, gGrassi, email_utente, giorno) 
                                     VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)`;
                await pool.query(insertQuery, [calorie, carboidrati, proteine, grassi, email]);
            }
            
            return res.json({ array_risposta: 'addFood', login: true, insert: true });
        } else {
            return res.json({ array_risposta: 'addFood', login: false });
        }
    } catch (error) {
        console.error('Error adding food:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function requestCalories(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const query = `SELECT * FROM dati_kcal WHERE email_utente = $1 AND giorno = CURRENT_DATE`;
            const result = await pool.query(query, [cookieEmail]);
            
            if (result.rows.length === 1) {
                const row = result.rows[0];
                return res.json({ array_risposta: 'requestCalories', dati_kcal: row });
            }
        }
        return res.json({ array_risposta: 'requestCalories', login: false });
    } catch (error) {
        console.error('Error requesting calories:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function addExercisesToWorkout(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;
    const nomeWorkout = req.body.nomeWorkout;
    const exerciseArray = req.body.exerciseArray;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;

            // Controllo se il workout esiste già, altrimenti lo creo
            let query = `SELECT * FROM workouts WHERE nome = $1 AND email_utente = $2`;
            let result = await pool.query(query, [nomeWorkout, email]);

            if (result.rows.length === 0) {
                // Se il workout non esiste, lo inserisco
                query = `INSERT INTO workouts (nome, email_utente) VALUES ($1, $2)`;
                await pool.query(query, [nomeWorkout, email]);
            }

            // Ottengo l'ID del workout
            query = `SELECT id FROM workouts WHERE nome = $1 AND email_utente = $2`;
            result = await pool.query(query, [nomeWorkout, email]);
            const idWorkout = result.rows[0].id;

            // Inserisco gli esercizi nel workout
            for (const nomeEsercizio of exerciseArray) {
                // Controllo se l'esercizio esiste già, altrimenti lo creo
                query = `SELECT * FROM esercizi WHERE nome = $1 AND email_utente = $2`;
                result = await pool.query(query, [nomeEsercizio, email]);

                if (result.rows.length === 0) {
                    // Se l'esercizio non esiste, lo inserisco
                    query = `INSERT INTO esercizi (nome, email_utente) VALUES ($1, $2)`;
                    await pool.query(query, [nomeEsercizio, email]);
                }

                // Ottengo l'ID dell'esercizio
                query = `SELECT id FROM esercizi WHERE nome = $1 AND email_utente = $2`;
                result = await pool.query(query, [nomeEsercizio, email]);
                const idEsercizio = result.rows[0].id;

                // Inserisco l'associazione tra workout ed esercizio
                query = `INSERT INTO esercizi_workouts (id_workout, id_esercizio) VALUES ($1, $2)`;
                await pool.query(query, [idWorkout, idEsercizio]);
            }

            return res.json({ array_risposta: 'addExerciseToWorkout', login: true, inserimento: true });
        } else {
            return res.json({ array_risposta: 'addExerciseToWorkout', login: false });
        }
    } catch (error) {
        console.error('Error adding exercises to workout:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function requestProfile(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;
            const query = `SELECT * FROM utenti WHERE email = $1`;
            const result = await pool.query(query, [email]);

            if (result.rows.length === 1) {
                const row = result.rows[0];
                return res.json({
                    array_risposta: 'requestProfile',
                    login: true,
                    nome: row.nome,
                    cognome: row.cognome,
                    eta: row.eta,
                    peso: row.peso,
                    inserimento: true
                });
            } else {
                return res.json({ array_risposta: 'requestProfile', inserimento: false });
            }
        } else {
            return res.json({ array_risposta: 'requestProfile', login: false });
        }
    } catch (error) {
        console.error('Error requesting profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function requestWorkout(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;
            const query = `SELECT * FROM workouts WHERE email_utente = $1`;
            const result = await pool.query(query, [email]);
            const workouts = result.rows;

            return res.json({ array_risposta: 'requestWorkout', login: true, workouts });
        } else {
            return res.json({ array_risposta: 'requestWorkout', login: false });
        }
    } catch (error) {
        console.error('Error requesting workouts:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function modifyExercise(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;
    const nomeEsercizio = req.body.nome_esercizio;
    const peso = req.body.peso;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;
            const query = `UPDATE esercizi SET peso = $1 WHERE email_utente = $2 AND nome = $3`;
            const result = await pool.query(query, [peso, email, nomeEsercizio]);

            if (result.rowCount === 1) {
                return res.json({ array_risposta: 'modifyExercise', login: true, inserimento: true });
            } else {
                return res.json({ array_risposta: 'modifyExercise', login: true, inserimento: false });
            }
        } else {
            return res.json({ array_risposta: 'modifyExercise', login: false });
        }
    } catch (error) {
        console.error('Error modifying exercise:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function requestExercises(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;
    const nomeWorkout = req.body.nome_workout;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;
            const query = `SELECT e.nome, 
                 GROUP_CONCAT(setss.num_set , setss.repetitions ORDER BY setss.num_set ASC) AS num_set, 
                 GROUP_CONCAT(setss.peso ORDER BY setss.num_set ASC) AS peso, 
                 GROUP_CONCAT(setss.repetitions ORDER BY setss.num_set ASC) AS repetitions
          FROM esercizi e
          INNER JOIN esercizi_workouts ew ON e.id = ew.id_esercizio
          INNER JOIN workouts w ON ew.id_workout = w.id
          LEFT JOIN setss ON setss.nome_esercizio = e.nome AND setss.email_utente = $1
          WHERE w.nome = $2 AND w.email_utente = $1
          GROUP BY e.nome`;
            const result = await pool.query(query, [email, nomeWorkout]);
            const exercises = [];

            result.rows.forEach(row => {
                const exercise = {
                    nome: row.nome,
                    num_set: row.num_set ? row.num_set.split(',') : null,
                    peso: row.peso ? row.peso.split(',') : null,
                    reps: row.repetitions ? row.repetitions.split(',') : null
                };
                exercises.push(exercise);
            });

            return res.json({ array_risposta: 'requestExercises', login: true, exercises });
        } else {
            return res.json({ array_risposta: 'requestExercises', login: false });
        }
    } catch (error) {
        console.error('Error requesting exercises:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function insertExerciseSet(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;
    const nomeEsercizio = req.body.nome_esercizio;
    const numSet = req.body.num_set;
    const peso = req.body.peso;
    const repetitions = req.body.repetitions;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;
            const queryCheckExerciseExist = `SELECT * FROM setss WHERE nome_esercizio = $1 AND email_utente = $2`;
            const resultCheckExercise = await pool.query(queryCheckExerciseExist, [nomeEsercizio, email]);

            let exist = false;
            if (resultCheckExercise.rowCount >= 1) {
                exist = true;
            }

            let queryInsertSet;
            if (peso !== 0 && repetitions !== 0 && exist) {
                queryInsertSet = `UPDATE setss SET peso = $1, repetitions = $2 WHERE num_set = $3 AND nome_esercizio = $4 AND email_utente = $5`;
                await pool.query(queryInsertSet, [peso, repetitions, numSet, nomeEsercizio, email]);
            } else {
                const sql = `SELECT MAX(num_set) AS ultimo_set FROM setss WHERE nome_esercizio = $1 AND email_utente = $2`;
                const result = await pool.query(sql, [nomeEsercizio, email]);
                let ultimo_set;
                if (result.rowCount > 0) {
                    ultimo_set = result.rows[0].ultimo_set + 1;
                } else {
                    ultimo_set = 1;
                }

                queryInsertSet = `INSERT INTO setss(nome_esercizio, email_utente, num_set, peso, repetitions) VALUES ($1, $2, $3, $4, $5)`;
                await pool.query(queryInsertSet, [nomeEsercizio, email, ultimo_set, peso, repetitions]);
            }

            return res.json({ array_risposta: 'insertExerciseSet', login: true, inserimento: true });
        } else {
            return res.json({ array_risposta: 'insertExerciseSet', login: false });
        }
    } catch (error) {
        console.error('Error inserting exercise set:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function modifyWeight(req, res) {
    const cookieId = req.body.cookie_id;
    const cookieEmail = req.body.cookie_email;
    const peso = req.body.peso;

    try {
        if (await verifyCookie(cookieId, cookieEmail)) {
            const email = cookieEmail;
            const query = `UPDATE utenti SET peso = $1 WHERE email = $2`;
            const result = await pool.query(query, [peso, email]);

            if (result.rowCount === 1) {
                return res.json({ array_risposta: 'modifyWeight', login: true, modifica: true });
            } else {
                return res.json({ array_risposta: 'modifyWeight', login: true, modifica: false });
            }
        } else {
            return res.json({ array_risposta: 'modifyWeight', login: false });
        }
    } catch (error) {
        console.error('Error modifying weight:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function registerUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const nome = req.body.name;
    const cognome = req.body.surname;
    const eta = req.body.age;
    const peso = req.body.weight;
    console.log("Dati "+email);
    try {
        const queryCheckEmail = `SELECT * FROM utenti WHERE email = $1;`;
        const resultCheckEmail = await pool.query(queryCheckEmail, [email]);
        if (resultCheckEmail.rowCount > 0) {
            return res.json({ array_risposta: 'registerUser', register: false });
        } else {
            const queryRegister = `INSERT INTO utenti (email, psw, nome, cognome, eta, peso) VALUES ($1, $2, $3, $4, $5, $6);`;
            const resultRegister = await pool.query(queryRegister, [email, password, nome, cognome, eta, peso]);

            if (resultRegister.rowCount === 1) {
                return res.json({ array_risposta: 'registerUser', register: true });
            } else {
                return res.json({ array_risposta: 'registerUser', register: false });
            }
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
