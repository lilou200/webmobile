
--Création tables-------------------------------------------------------------------------

DROP TABLE IF EXISTS AnimalCategory CASCADE;
DROP TABLE IF EXISTS Care CASCADE;
DROP TABLE IF EXISTS Belonging CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS Veterinarian CASCADE;
DROP TABLE IF EXISTS Availability CASCADE;
DROP TABLE IF EXISTS Oncall CASCADE;

CREATE TABLE Veterinarian (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    makeHomeVisits BOOLEAN DEFAULT FALSE NOT NULL,
    gsm VARCHAR(20) NOT NULL,
    StreetClinic VARCHAR(255) NOT NULL,
    numberClinic VARCHAR(10) NOT NULL,
    localityClinic VARCHAR(255) NOT NULL,
    gpsCoordinate VARCHAR(255) NOT NULL,
    schedule_fr VARCHAR(500) NOT NULL,
    schedule_en VARCHAR(500) NOT NULL,
    webSite VARCHAR(255)
);

CREATE TABLE AnimalCategory (
    label_fr VARCHAR(30) PRIMARY KEY,
    label_en VARCHAR(30) NOT NULL,
    description_fr VARCHAR(500) NOT NULL,
    description_en VARCHAR(500) NOT NULL
);

CREATE TABLE "User" (
    email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE Belonging (
    animalCategory VARCHAR (30) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    PRIMARY KEY (animalCategory, owner),
    FOREIGN KEY (animalCategory) REFERENCES AnimalCategory(label_fr) ON DELETE CASCADE,
    FOREIGN KEY (owner) REFERENCES "User"(email) ON DELETE CASCADE
);

CREATE TABLE Care(
    animalCategory VARCHAR(30) NOT NULL,
    veterinarian_id INTEGER NOT NULL,
    remark VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY (animalCategory, veterinarian_id),
    FOREIGN KEY (animalCategory) REFERENCES AnimalCategory(label_fr) ON DELETE CASCADE,
    FOREIGN KEY (veterinarian_id) REFERENCES Veterinarian(id) ON DELETE CASCADE
);

CREATE TABLE OnCall (
    gard_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "date" DATE NOT NULL,
    isNightOncall BOOLEAN NOT NULL
);

CREATE TABLE Availability(
    veterinarian_id INTEGER NOT NULL,
    oncall_id INTEGER NOT NULL,
    remark VARCHAR(500),
    PRIMARY KEY (veterinarian_id, oncall_id),
    FOREIGN KEY (veterinarian_id) REFERENCES Veterinarian(id) ON DELETE CASCADE,
    FOREIGN KEY (oncall_id) REFERENCES Oncall(gard_id) ON DELETE CASCADE
);

--Insertion lignes---------------------------------------------------------------------------------------------

INSERT INTO AnimalCategory (label_fr, label_en, description_fr, description_en) VALUES
('animaux domestiques habituels', 'usual pets', 'Chiens et chats.', 'Dogs and cats.'),
('autre Canidé', 'other Canid', 'loups, renards, coyotes.', 'Dogs, wolves, foxes, coyotes.'),
('autre Félidé', 'autre Felid', 'Lion, Tigre et semblables.', 'Cats, Lion, Tiger and the like.'),
('Lagomorphe', 'lagomorph', 'Lapins et Lièvres.', 'Rabbits and Hares.'),
('Oiseau', 'Bird', 'Animal volant, apprécié pour sa capacité à chanter et voler.', 'A flying animal appreciated for its singing and flying abilities.'),
('Poisson', 'Fish', 'Animal aquatique, souvent conservé dans un aquarium.', 'An aquatic animal often kept in an aquarium.'),
('Equidés', 'Equidae', 'Chevaux, Anes, Zèbres.', 'Horses, Donkeys, Zebras.'),
('Rongeur', 'rodent', 'Hamster, Rats, Capybara et semblables. ', 'Hamster, Rats, Capybara and similar.'),
('Ophidien', 'Ophidian', 'Serpent et associés.', 'Snake and alike.'),
('Saurien', 'Saurian', 'Reptiles comme les lézards, crocodiles et caméléons.', 'Reptiles like lizards, crocodiles and chameleons.'),
('Amphibien', 'Amphibian', 'Grenouilles, Axolotls.', 'Frogs, Axolotls.'),
('Arachnide', 'Arachnid', 'Araignés et Scorpions.', 'Spiders and Scorpions.');


INSERT INTO "User" (email, username, password, isAdmin) VALUES
('alice@example.be', 'Alice', '$argon2id$v=19$m=65536,t=3,p=4$IGA70IyjacOqCTNbk0vDmA$2YyPYQyEA08YlWAjzS2et3B6JBeAm316rO+HLUpKI+8', FALSE),--mdpAlice123
('bob@example.be', 'Bob', '$argon2id$v=19$m=65536,t=3,p=4$xGBHX62uEPpj5RuwW+o/Qw$bBaWAfblqL805FLa0HcrSyjBguQ1I1dGbbwmqumz3YU', FALSE),--mdpBob123
('charlotte@example.be', 'Charlotte', '$argon2id$v=19$m=65536,t=3,p=4$1ekWS9b/RSW06DHTe3Uzfg$qSmblqQFZQDz7NYq/nBXVO55y80x+tduoNQfW9eTvkE', FALSE),--mdpCharlotte123
('david@example.be', 'David', '$argon2id$v=19$m=65536,t=3,p=4$OxNnaTPDdpygDWz2B6ixhg$BTKFf7ClBfpnetI0RsjmvuJFVM5hn436n3R0UWSaZZo', FALSE),--mdpDavid123
('emily@example.be', 'Emily', '$argon2id$v=19$m=65536,t=3,p=4$LqaikEz7MR5Pn6XFzVTh8w$BWX+llIfFVmswb736jLCNsvnOW3spLrACMtz7elsZsg', FALSE),--mdpEmily123
('frank@example.be', 'Frank', '$argon2id$v=19$m=65536,t=3,p=4$1tJUD99d4xCEK2NxSiDl/w$riGCPWTDwZn8QHvcXfzHar6aJVFifNIX0OL4uLOPqbo', FALSE),--mdpFrank123
('aude.c@example.be', 'Aude', '$argon2id$v=19$m=65536,t=3,p=4$OlKy3TvI6tcTE72AoZsR7Q$Qwt/cg9Bg6ZI3+pg6DH8WFemVEKY2W2eAYiZdxqefIM', TRUE),--mdpAude123
('liam.l@example.be', 'Liam', '$argon2id$v=19$m=65536,t=3,p=4$qATydvIEHEWpHLAEGH1s8Q$+S0EqjUfN08T2ccrUdOerR+jQkDSr69GRI22ZcPVyiY', TRUE),--mdpLiam123
('jean.n@example.be', 'Jean', '$argon2id$v=19$m=65536,t=3,p=4$/wfQilHUKf/XZuG/T9HEwg$duFl4B/DfwkvDEroNcdDYkRKn/zoGsT4tVIo0YIL9MI', TRUE),--mdpJean123
('jeannette.m@example.be', 'Jeannette', '$argon2id$v=19$m=65536,t=3,p=4$EZLqJ1QMV7Vxnf2ERR4VJw$xe8KCSYOJ0yN/x/yvgcq/R7X04+ZE55hpvcyuwQRR9c', TRUE),--mdpJeannette123
('georges.b@example.be', 'MrGeorges', '$argon2id$v=19$m=65536,t=3,p=4$JpR5dyMhiXvfTQ1RRW1IVg$wctkWlk/fInbN34RAYNpjNnGmwD/ANByF1RnkbDnIdw', TRUE);--mdpGeorges123


-- Pour Namur
INSERT INTO Veterinarian (lastname, firstname, makeHomeVisits, gsm, StreetClinic, numberClinic, localityClinic, gpsCoordinate, schedule_fr, schedule_en, webSite) VALUES
('Dupont', 'Marie', FALSE, '0485423456', 'Rue de l Ange', '12', 'Namur', '50.4675,4.8709', 'Lundi-Vendredi : 9h-18h', 'Monday-Friday: 9am-6pm', 'http://vetdupont.be'),
('Lemoine', 'Pierre', TRUE, '0487123812', 'Rue de la Croix de Pierre', '25', 'Namur', '50.4661,4.8702', 'Lundi-Vendredi : 8h30-18h', 'Monday-Friday: 8.30am-6pm', 'http://vetlove.be'),
('Girard', 'Claire', FALSE, '0487125456', 'Avenue Albert', '20', 'Namur', '50.4667,4.8725', 'Lundi-Vendredi : 9h-18h', 'Monday-Friday: 9am-6pm', NULL),
('Dupuis', 'Antoine', TRUE, '0480923456', 'Quai de la Batte', '5', 'Namur', '50.4660,4.8676', 'Lundi-Vendredi : 9h-17h', 'Monday-Friday: 9am-5pm', NULL),
('Lemoine', 'Sophie', TRUE, '0487123226', 'Rue Saint-Jean', '35', 'Namur', '50.4678,4.8700', 'Lundi-Vendredi : 9h-19h', 'Monday-Friday: 9am-7pm', 'http://vetLemoine.be');
-- Pour Gembloux
INSERT INTO Veterinarian (lastname, firstname, makeHomeVisits, gsm, StreetClinic, numberClinic, localityClinic, gpsCoordinate, schedule_fr, schedule_en, webSite) VALUES
('Lambert', 'Jean', FALSE, '0498144456', 'Rue de la Résistance', '10', 'Gembloux', '50.5625,4.6995', 'Lundi-Samedi : 10h-17h', 'Monday-Saturday: 10am-5pm', NULL),
('Martin', 'Léa', FALSE, '0498125556', 'Rue Léon Guénot', '15', 'Gembloux', '50.5612,4.6989', 'Lundi-Samedi : 8h-17h', 'Monday-Saturday: 8am-5pm', 'http://animallove.be'),
('Leclerc', 'Maxime', FALSE, '0498663456', 'Rue du Commerce', '30', 'Gembloux', '50.5610,4.6999', 'Lundi-Samedi : 9h-17h', 'Monday-Saturday: 9am-5pm', 'http://vetanimal.be'),
('Boucher', 'Émilie', FALSE, '0498123224', 'Avenue des Combattants', '7', 'Gembloux', '50.5620,4.6982', 'Lundi-Samedi : 10h-17h', 'Monday-Saturday: 10am-5pm', NULL),
('Robert', 'Hugo', TRUE, '0498123477', 'Rue d Andenne', '50', 'Gembloux', '50.5630,4.6993', 'Lundi-Samedi : 10h-19h', 'Monday-Saturday: 10am-7pm', NULL);
-- Pour Andenne
INSERT INTO Veterinarian (lastname, firstname, makeHomeVisits, gsm, StreetClinic, numberClinic, localityClinic, gpsCoordinate, schedule_fr, schedule_en, webSite) VALUES
('Navez', 'Paul', FALSE, '0458123156', 'Rue du Commerce', '7', 'Andenne', '50.4859,5.0955', 'Tous les jours : 9h-19h', 'Everyday: 9am-7pm', NULL),
('Hebert', 'Pauline', TRUE, '0458133456', 'Avenue de la Gare', '10', 'Andenne', '50.4863,5.0962', 'Tous les jours : 9h-19h', 'Everyday: 9am-7pm', NULL),
('Gauthier', 'Guillaume', TRUE, '0458883456', 'Rue Saint-Jean', '5', 'Andenne', '50.4845,5.0970', 'Tous les jours : 9h-19h', 'Everyday: 9am-7pm', NULL),
('Fayet', 'Isabelle', TRUE, '0458123996', 'Rue des Bons-Vivants', '20', 'Andenne', '50.4875,5.0948', 'Tous les jours : 9h-19h', 'Everyday: 9am-7pm', 'http://vet.be');
-- Pour Jambes
INSERT INTO Veterinarian (lastname, firstname, makeHomeVisits, gsm, StreetClinic, numberClinic, localityClinic, gpsCoordinate, schedule_fr, schedule_en, webSite) VALUES
('Dupuis', 'Chantal', TRUE, '0448128886', 'Rue de la Meuse', '35', 'Jambes', '50.4490,4.8765', 'Lundi-Vendredi : 10h-18h', 'Monday-Friday: 10am-6pm', 'http://vetdupuis.be'),
('Germain', 'François', FALSE, '0448123456', 'Boulevard de l Indépendance', '10', 'Jambes', '50.4485,4.8760', 'Lundi-Vendredi : 10h-18h', 'Monday-Friday: 10am-6pm', NULL),
('Bertin', 'Elise', FALSE, '0448121256', 'Rue des Hérissons', '40', 'Jambes', '50.4470,4.8750', 'Lundi-Vendredi : 10h-18h', 'Monday-Friday: 10am-6pm', NULL),
('Muller', 'Marc', FALSE, '0448123876', 'Rue des Ecoles', '15', 'Jambes', '50.4500,4.8745', 'Lundi-Vendredi : 10h-18h', 'Monday-Friday: 10am-6pm', NULL),
('Carpentier', 'Audrey', TRUE, '0448666456', 'Avenue du Stade', '20', 'Jambes', '50.4492,4.8771', 'Lundi-Vendredi : 10h-18h', 'Monday-Friday: 10am-6pm', NULL);
-- Pour Eghezée
INSERT INTO Veterinarian (lastname, firstname, makeHomeVisits, gsm, StreetClinic, numberClinic, localityClinic, gpsCoordinate, schedule_fr, schedule_en, webSite) VALUES
('Vermeulen', 'Isabelle', FALSE, '0428123456', 'Rue de l Industrie', '5', 'Eghezée', '50.6160,4.8985', 'Lundi-Vendredi : 8h-20h', 'Monday-Friday: 8am-8pm', 'http://vetvermeulen.be'),
('Pires', 'Hugo', FALSE, '0428111156', 'Rue du Village', '7', 'Eghezée', '50.6170,4.8995', 'Lundi-Vendredi : 8h-20h', 'Monday-Friday: 8am-8pm', NULL),
('Dumont', 'Claire', TRUE, '0428127756', 'Avenue des Sports', '12', 'Eghezée', '50.6158,4.9000', 'Lundi-Vendredi : 8h-20h', 'Monday-Friday: 8am-8pm', 'http://vetdumont.be');

INSERT INTO Belonging (animalCategory, owner) VALUES
('animaux domestiques habituels', 'alice@example.be'),
('animaux domestiques habituels', 'bob@example.be'),
('Equidés', 'bob@example.be'),
('Oiseau', 'charlotte@example.be'),
('Poisson', 'david@example.be'),
('Lagomorphe', 'emily@example.be'),
('Saurien', 'frank@example.be'),
('Equidés', 'georges.b@example.be');

INSERT INTO Care (animalCategory, veterinarian_id, remark) VALUES
('animaux domestiques habituels', 1, NULL),
('animaux domestiques habituels', 2, 'Chien en musolière'),
('animaux domestiques habituels', 3, NULL),
('animaux domestiques habituels', 6, NULL),
('animaux domestiques habituels', 10, NULL),
('animaux domestiques habituels', 13, NULL),
('animaux domestiques habituels', 14, NULL),
('animaux domestiques habituels', 15, NULL),
('animaux domestiques habituels', 16, NULL),
('animaux domestiques habituels', 17, NULL),
('animaux domestiques habituels', 20, NULL),
('autre Félidé', 10, 'Seulement à domicile'),
('autre Canidé', 1, NULL),
('Lagomorphe', 3, NULL),
('Lagomorphe', 4, NULL),
('Lagomorphe', 7, NULL),
('Lagomorphe', 8, NULL),
('Lagomorphe', 10, NULL),
('Lagomorphe', 20, NULL),
('Lagomorphe', 21, NULL),
('Poisson', 4, NULL),
('Poisson', 5, NULL),
('Poisson', 6, NULL),
('Poisson', 7, NULL),
('Poisson', 19, NULL),
('Rongeur', 5, NULL),
('Rongeur', 9, NULL),
('Rongeur', 11, NULL),
('Rongeur', 21, NULL),
('Ophidien', 5, NULL),
('Saurien', 5, NULL),
('Amphibien', 9, NULL),
('Amphibien', 1, NULL),
('Arachnide', 19, NULL),
('Equidés', 12, 'Soins seulement à domicile'),
('Equidés', 2, 'Soins seulement à domicile'),
('Equidés', 22, 'Soins seulement à domicile'),
('Oiseau', 18, NULL),
('Oiseau', 16, NULL),
('Oiseau', 10, NULL),
('Oiseau', 21, NULL);


INSERT INTO OnCall (date, isNightOncall) VALUES
('2024-12-18', TRUE),
('2024-12-19', TRUE),
('2024-12-20', TRUE),
('2024-12-21', FALSE),
('2024-12-21', TRUE),
('2024-12-22', FALSE),
('2024-12-22', TRUE),
('2024-12-23', TRUE),
('2024-12-24', TRUE),
('2024-12-25', FALSE),
('2024-12-25', TRUE),
('2024-12-26', TRUE),
('2024-12-27', TRUE),
('2024-12-28', FALSE),
('2024-12-28', TRUE),
('2024-12-29', FALSE),
('2024-12-29', TRUE),
('2024-12-30', TRUE),
('2024-12-31', TRUE),
('2025-01-01', FALSE),
('2025-01-01', TRUE),
('2025-01-02', TRUE),
('2025-01-03', TRUE),
('2025-01-04', TRUE),
('2025-01-04', FALSE),
('2025-01-05', FALSE),
('2025-01-05', TRUE),
('2025-01-06', TRUE),
('2025-01-07', TRUE),
('2025-01-08', TRUE),
('2025-01-09', TRUE),
('2025-01-10', TRUE),
('2025-01-11', TRUE),
('2025-01-11', FALSE),
('2025-01-12', FALSE),
('2025-01-12', TRUE),
('2025-01-13', TRUE),
('2025-01-14', TRUE),
('2025-01-15', TRUE),
('2025-01-16', TRUE),
('2025-01-17', TRUE),
('2025-01-18', TRUE),
('2025-01-18', FALSE),
('2025-01-19', FALSE),
('2025-01-19', TRUE),
('2025-01-20', TRUE),
('2025-01-21', TRUE),
('2025-01-22', TRUE),
('2025-01-23', TRUE),
('2025-01-24', TRUE),
('2025-01-25', TRUE),
('2025-01-25', FALSE),
('2025-01-26', FALSE),
('2025-01-26', TRUE);

INSERT INTO Availability (veterinarian_id, oncall_id) VALUES
(1, 1),(6, 1), (11, 1), (15, 1), (20, 1),
(2, 2), (7, 2), (12, 2), (16, 2), (21, 2),
(3, 3),(8, 3),(13, 3),(17, 3), (22, 3),
(4, 4),(9, 4),(14, 4),(18, 4), (20, 4),
(5, 5),(10, 5),(11, 5),(19, 5), (21, 5),
(1, 6),(6, 6),(12, 6),(15, 6), (22, 6),
(1, 7),(6, 7),(11, 7),(15, 7), (20, 7),
(2, 8),(7, 8),(12, 8),(16, 8), (21, 8),
(3, 9),(8, 9),(13, 9),(17, 9), (20, 9),
(4, 10),(9, 10),(14, 10),(18, 10), (21, 10),
(5, 11),(10, 11),(11, 11),(19, 11), (22, 11),
(1, 12),(6, 12),(12, 12),(16, 12), (20, 12),
(2, 13),(7, 13),(13, 13),(17, 13), (21, 13),
(3, 14),(8, 14),(14, 14),(18, 14), (22, 14),
(4, 15),(9, 15),(11, 15),(19, 15), (20, 15),
(5, 16),(10, 16),(12, 16),(19, 16), (21, 16),
(1, 17),(6, 17),(11, 17),(15, 17), (22, 17),
(2, 18),(7, 18),(14, 18),(16, 18), (20, 18),
(3, 19),(8, 19),(11, 19),(17, 19), (21, 19),
(4, 20),(9, 20),(12, 20),(18, 20), (22, 20),
(5, 21),(10, 21),(13, 21),(19, 21), (20, 21),
(1, 22),(6, 22),(14, 22),(16, 22), (21, 22),
(1, 23),(6, 23),(11, 23),(15, 23), (20, 23),
(2, 24),(7, 24),(12, 24),(16, 24), (21, 24),
(3, 25),(8, 25),(13, 25),(17, 25), (22, 25),
(4, 26),(9, 26),(14, 26),(18, 26), (20, 26),
(5, 27),(10, 27),(11, 27),(19, 27), (21, 27),
(1, 28),(6, 28),(12, 28),(15, 28), (22, 28),
(1, 29),(6, 29),(11, 29),(15, 29), (20, 29),
(2, 30),(7, 30),(12, 30),(16, 30), (21, 30),
(3, 31),(8, 31),(13, 31),(17, 31), (20, 31),
(4, 32),(9, 32),(14, 32),(18, 32), (21, 32),
(5, 33),(10, 33),(11, 33),(19, 33), (22, 33),
(1, 34),(6, 34),(12, 34),(16, 34), (20, 34),
(2, 35),(7, 35),(13, 35),(17, 35), (21, 35),
(3, 37),(8, 37),(14, 37),(18, 37), (22, 37),
(4, 38),(9, 38),(11, 38),(19, 38), (20, 38),
(5, 39),(10, 39),(12, 39),(19, 39), (21, 39),
(1, 40),(6, 40),(11, 40),(15, 40), (22, 40),
(2, 41),(7, 41),(14, 41),(16, 41), (20, 41),
(3, 42),(8, 42),(11, 42),(17, 42), (21, 42),
(4, 43),(9, 43),(12, 43),(18, 43), (22, 43),
(5, 44),(10, 44),(13, 44),(19, 44), (20, 44),
(1, 45),(6, 45),(14, 45),(16, 45), (21, 45),
(1, 46),(6, 46),(11, 46),(15, 46), (20, 46),
(2, 47),(7, 47),(12, 47),(16, 47), (21, 47),
(3, 48),(8, 48),(13, 48),(17, 48), (22, 48),
(4, 49),(9, 49),(14, 49),(18, 49), (20, 49),
(5, 50),(10, 50),(11, 50),(19, 50), (21, 50),
(1, 51),(6, 51),(12, 51),(15, 51), (22, 51),
(1, 52),(6, 52),(11, 52),(15, 52), (20, 52),
(2, 53),(7, 53),(12, 53),(16, 53), (21, 53);




