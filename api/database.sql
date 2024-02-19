create database gym-app;

use gym-app;

CREATE TABLE utenti (
    email VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(50),
    cognome VARCHAR(50),
    eta INT,
    password VARCHAR(100),
    peso INT,
    id_dati INT,
    FOREIGN KEY (id_dati) REFERENCES dati_kcal(id)
);

create table esercizi(
    id int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email_utente VARCHAR(50),
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

create table dati_kcal(
    id int AUTO_INCREMENT PRIMARY KEY,
    gCarboidrati int,
    gProteine int,
    gGrassi int,
    email_utente VARCHAR(50),
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

create table cookie(
    id int primary key,
    email_utente VARCHAR(50),
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

create table workouts(
    id int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email_utente VARCHAR(50),
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

create table esercizi_workouts(
    int id_workout,
    int id_esercizio,
    primary key (id_workout),
    primary key (id_esercizio),
    FOREIGN KEY (id_workout) REFERENCES workouts(id),
    FOREIGN KEY (id_esercizio) REFERENCES esercizi(id)
);