
CREATE DATABASE IF NOT EXISTS tamarobot_sql;
USE tamarobot_sql;

CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tamarobots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_tama VARCHAR(100) NOT NULL,
    utilisateur_id INT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

INSERT INTO utilisateurs (nom_utilisateur, mot_de_passe) VALUES
('alice', 'azerty123'),
('bob', 'password1'),
('charlie', 'letmein'),
('diana', '12345678'),
('eve', 'toto123');

INSERT INTO tamarobots (nom_tama, utilisateur_id) VALUES
('TamaZen', 1),
('TamaBoum', 2),
('TamaCool', 3),
('TamaFeu', 4),
('Tama', 5);
