
CREATE DATABASE IF NOT EXISTS tamarobot_sql;
USE tamarobot_sql;

CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user' 
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

INSERT INTO utilisateurs (nom_utilisateur, mot_de_passe, role)
VALUES ('admin', 'admin123', 'admin');

SET @admin_id = (SELECT id FROM utilisateurs WHERE nom_utilisateur = 'admin');
INSERT INTO tamarobots (nom_tama, utilisateur_id) VALUES ('TamaKing', @admin_id);

ALTER TABLE utilisateurs ADD derniere_connexion DATETIME NULL;
