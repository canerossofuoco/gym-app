
CREATE DATABASE gym_app;
USE gym_app;

CREATE TABLE utenti (
    email VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    eta INT NOT NULL,
    psw VARCHAR(100) NOT NULL,
    peso float NOT NULL,
    id_dati int 
);

CREATE TABLE dati_kcal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calorie INT NOT NULL,
    gCarboidrati INT NOT NULL,
    gProteine INT NOT NULL,
    gGrassi INT NOT NULL,
    email_utente VARCHAR(100) NOT NULL,
    giorno DATE NOT NULL,
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

CREATE TABLE cookie (
    id INT PRIMARY KEY,
    email_utente VARCHAR(100) NOT NULL,
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

CREATE TABLE esercizi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email_utente VARCHAR(100) NOT NULL,
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email_utente VARCHAR(100) NOT NULL,
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

CREATE TABLE esercizi_workouts (
    id_workout INT ,
    id_esercizio INT ,
    PRIMARY KEY (id_workout, id_esercizio),
    FOREIGN KEY (id_workout) REFERENCES workouts(id),
    FOREIGN KEY (id_esercizio) REFERENCES esercizi(id)
);

-- Creazione della tabella 'sets'
CREATE TABLE setss (
    num_set INT,
    nome_esercizio VARCHAR(50),
    email_utente VARCHAR(100),
    peso FLOAT NOT NULL,
    repetitions int NOT NULL,
    PRIMARY KEY (nome_esercizio, email_utente, num_set)
);

ALTER TABLE utenti ADD CONSTRAINT fk_dati_kcal FOREIGN KEY (id_dati) REFERENCES dati_kcal(id);
ALTER TABLE esercizi_workouts ADD CONSTRAINT fk_idworkout FOREIGN KEY (id_workout) REFERENCES workouts(id);
ALTER TABLE esercizi_workouts ADD CONSTRAINT fk_idesercizio FOREIGN KEY (id_esercizio) REFERENCES esercizi(id);

ALTER TABLE esercizi ADD CONSTRAINT fk_email_esercizi FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE dati_kcal ADD CONSTRAINT fk_email_datikcal FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE cookie ADD CONSTRAINT fk_email_cookie FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE workouts ADD CONSTRAINT fk_email_workouts FOREIGN KEY (email_utente) REFERENCES utenti(email);

