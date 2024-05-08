-- Creazione del database
CREATE DATABASE gym_app;
USE gym_app;

-- Creazione della tabella 'utenti'
CREATE TABLE utenti (
    email VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(50),
    cognome VARCHAR(50),
    eta INT,
    psw VARCHAR(100),
    peso float,
    id_dati int
);

-- Creazione della tabella 'dati_kcal'
CREATE TABLE dati_kcal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calorie INT,
    gCarboidrati INT,
    gProteine INT,
    gGrassi INT,
    email_utente VARCHAR(100),
    giorno DATE,
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

-- Creazione della tabella 'cookie'
CREATE TABLE cookie (
    id INT PRIMARY KEY,
    email_utente VARCHAR(100),
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

-- Creazione della tabella 'esercizi'
CREATE TABLE esercizi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email_utente VARCHAR(100),
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

-- Creazione della tabella 'workouts'
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email_utente VARCHAR(100),
    FOREIGN KEY (email_utente) REFERENCES utenti(email)
);

-- Creazione della tabella 'esercizi_workouts'
CREATE TABLE esercizi_workouts (
    id_workout INT,
    id_esercizio INT,
    PRIMARY KEY (id_workout, id_esercizio),
    FOREIGN KEY (id_workout) REFERENCES workouts(id),
    FOREIGN KEY (id_esercizio) REFERENCES esercizi(id)
);

-- Creazione della tabella 'sets'
CREATE TABLE setss (
    num_set INT,
    nome_esercizio VARCHAR(50),
    email_utente VARCHAR(100),
    peso FLOAT,
    repetitions int,
    PRIMARY KEY (nome_esercizio, email_utente, num_set)
);

-- Aggiunta dei vincoli di chiave esterna per utenti e relazioni tra tabelle
ALTER TABLE utenti ADD CONSTRAINT fk_dati_kcal FOREIGN KEY (id_dati) REFERENCES dati_kcal(id);
ALTER TABLE esercizi_workouts ADD CONSTRAINT fk_idworkout FOREIGN KEY (id_workout) REFERENCES workouts(id);
ALTER TABLE esercizi_workouts ADD CONSTRAINT fk_idesercizio FOREIGN KEY (id_esercizio) REFERENCES esercizi(id);

-- Aggiunta dei vincoli di chiave esterna per le altre relazioni
ALTER TABLE esercizi ADD CONSTRAINT fk_email_esercizi FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE dati_kcal ADD CONSTRAINT fk_email_datikcal FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE cookie ADD CONSTRAINT fk_email_cookie FOREIGN KEY (email_utente) REFERENCES utenti(email);
ALTER TABLE workouts ADD CONSTRAINT fk_email_workouts FOREIGN KEY (email_utente) REFERENCES utenti(email);



-- Inserimento di record nella tabella 'utenti'
INSERT INTO utenti (email, nome, cognome, eta, psw, peso) 
VALUES 
('utente1@example.com', 'Mario', 'Rossi', 30, 'password123', 75),
('utente2@example.com', 'Luigi', 'Verdi', 25, 'securepwd456', 80),
('utente3@example.com', 'Giovanna', 'Bianchi', 35, 'strongpassword789', 65),
('utente4@example.com', 'Paola', 'Neri', 28, 'safepass789', 70),
('utente5@example.com', 'Andrea', 'Russo', 32, 'secret123', 85);

-- Inserimento di record nella tabella 'dati_kcal'
INSERT INTO dati_kcal (calorie, gCarboidrati, gProteine, gGrassi, email_utente, giorno)
VALUES
(500, 60, 50, 20, 'utente1@example.com', '2024-01-31'),
(600, 70, 55, 25, 'utente2@example.com', '2024-01-31'),
(450, 55, 45, 15, 'utente3@example.com', '2024-01-31'),
(550, 65, 60, 30, 'utente4@example.com', '2024-01-31'),
(700, 80, 70, 35, 'utente5@example.com', '2024-01-31');

-- Inserimento di record nella tabella 'cookie'
INSERT INTO cookie (id, email_utente)
VALUES
(1, 'utente1@example.com'),
(2, 'utente2@example.com'),
(3, 'utente3@example.com'),
(4, 'utente4@example.com'),
(5, 'utente5@example.com');

-- Inserimento di record nella tabella 'esercizi'
INSERT INTO esercizi (nome, email_utente)
VALUES
('Sollevamento pesi', 'utente1@example.com'),
('Addominali', 'utente2@example.com'),
('Corsetta', 'utente3@example.com'),
('Panca piana', 'utente4@example.com'),
('Squat', 'utente5@example.com');

-- Inserimento di record nella tabella 'workouts'
INSERT INTO workouts (nome, email_utente)
VALUES
('Allenamento A', 'utente1@example.com'),
('Allenamento B', 'utente2@example.com'),
('Allenamento C', 'utente3@example.com'),
('Allenamento D', 'utente4@example.com'),
('Allenamento E', 'utente5@example.com');

-- Inserimento di record nella tabella 'esercizi_workouts'
INSERT INTO esercizi_workouts (id_workout, id_esercizio)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Inserimento di record nella tabella 'sets'
INSERT INTO setss (num_set, nome_esercizio, email_utente, peso,repetitions)
VALUES
(1, 'Sollevamento pesi', 'utente1@example.com', 20,4),
(2, 'Addominali', 'utente2@example.com', 10,5),
(3, 'Corsetta', 'utente3@example.com', NULL,6),
(4, 'Panca piana', 'utente4@example.com', 30,7),
(5, 'Squat', 'utente5@example.com', 40,8);
