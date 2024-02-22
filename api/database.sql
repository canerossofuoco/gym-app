create database gym_app;

use gym_app;

CREATE TABLE utenti (
    email VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(50),
    cognome VARCHAR(50),
    eta INT,
    psw VARCHAR(100),
    peso INT,
    id_dati INT,
    stringa_peso varchar(1000)
);

create table esercizi(
    id int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email_utente VARCHAR(50),
    stringa_peso varchar(1000)
);

create table dati_kcal(
    id int AUTO_INCREMENT PRIMARY KEY,
    gCarboidrati int,
    gProteine int,
    gGrassi int,
    email_utente VARCHAR(50),
    giorno date
);
create table cookie(
    id int primary key,
    email_utente VARCHAR(50)
);


create table workouts(
    id int AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email_utente VARCHAR(50)
);


create table esercizi_workouts(
    id_workout int,
    id_esercizio int,
    primary key (id_workout,id_esercizio)
);


ALTER TABLE utenti ADD CONSTRAINT fk_dati_kcal FOREIGN KEY (id_dati) REFERENCES dati_kcal(id);
ALTER TABLE esercizi ADD CONSTRAINT fk_email_esercizi FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE dati_kcal ADD CONSTRAINT fk_email_datikcal FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE cookie ADD CONSTRAINT fk_email_cookie FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE workouts ADD CONSTRAINT fk_email_workouts FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE esercizi_workouts ADD CONSTRAINT fk_idworkout FOREIGN KEY (id_workout) REFERENCES workouts(id);
ALTER TABLE esercizi_workouts ADD CONSTRAINT fk_idesercizio FOREIGN KEY (id_esercizio) REFERENCES esercizi(id);


INSERT INTO utenti (email, nome, cognome, eta, psw, peso,stringa_peso) VALUES ('utente1@example.com', 'Mario', 'Rossi', 30, 'password1', 70,'70kg'),('utente2@example.com', 'Laura', 'Bianchi', 25, 'password2', 65,'65kg');
INSERT INTO esercizi (nome, email_utente, stringa_peso) VALUES ('Corsa', 'utente1@example.com', '3kg'),('Sollevamento pesi', 'utente2@example.com', '10kg');
INSERT INTO dati_kcal (gCarboidrati, gProteine, gGrassi, email_utente, giorno) VALUES (200, 80, 50, 'utente1@example.com', '2024-01-31'),(150, 70, 60, 'utente2@example.com', '2024-01-30');
INSERT INTO cookie (id, email_utente) VALUES (1, 'utente1@example.com'),(2, 'utente2@example.com');
INSERT INTO workouts (nome, email_utente) VALUES ('Allenamento cardio', 'utente1@example.com'),('Sollevamento pesi', 'utente2@example.com');
INSERT INTO esercizi_workouts (id_workout, id_esercizio) VALUES (1, 1),(2, 2);

UPDATE utenti SET id_dati = 1 where email="utente1@example.com";
UPDATE utenti SET id_dati = 2 where email="utente2@example.com";