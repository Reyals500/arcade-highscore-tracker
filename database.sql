-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "email" TEXT,
  "phone_number" TEXT,
  "region" TEXT
);

CREATE TABLE "Game_table" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) NOT NULL,
  "img_url" VARCHAR(200),
  "overview_text" TEXT NOT NULL
);

CREATE TABLE "Leaderboard" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user" ("id"),
  "game_id" INTEGER NOT NULL REFERENCES "Game_table" ("id"),
  "scores" TEXT,
  "img" TEXT,
  "date" DATE,
  "time" TIME
);
INSERT INTO "Leaderboard"
("user_id", "game_id", "scores", "date", "time")
VALUES
(1, 1, 1500, '2024-02-01', '14:35:22'), (2, 3, 2200, '2024-02-01', '16:45:11'), (3, 2, 1800, '2024-02-02', '10:20:05'), (4, 5, 1900, '2024-02-02', '12:10:33'), (5, 4, 2100, '2024-02-03', '09:55:44'), (1, 6, 1600, '2024-02-03', '14:25:17'), (3, 7, 2400, '2024-02-04', '11:30:02'), (2, 8, 2300, '2024-02-04', '13:40:55'), (5, 1, 1700, '2024-02-05', '15:15:28'), (4, 2, 2000, '2024-02-05', '17:20:19'), (1, 3, 2100, '2024-02-06', '10:05:37'), (2, 4, 1900, '2024-02-06', '12:10:44'), (3, 5, 2300, '2024-02-07', '09:40:26'), (4, 6, 1800, '2024-02-07', '14:55:18'), (5, 7, 2500, '2024-02-08', '10:20:30'), (1, 8, 2200, '2024-02-08', '12:30:15'), (2, 1, 1900, '2024-02-09', '15:45:22'), (3, 2, 2000, '2024-02-09', '17:50:39'), (4, 3, 2400, '2024-02-10', '11:10:58'), (5, 4, 2100, '2024-02-10', '13:25:47');

INSERT INTO "Game_table"
("name", "overview_text")
VALUES
('Space Race', 'Compete against other spaceships in a fast-paced race through the cosmos. Avoid obstacles, collect power-ups, and use boosters to outmaneuver your opponents and reach the finish line first!'), ('Breakout Blast', 'Use a paddle to bounce a ball against a wall of bricks, breaking them all to clear the level. Watch out for power-ups and avoid letting the ball fall past your paddle!'),
('Streets Fighter IV', 'Engage in one-on-one combat against a series of skilled opponents from around the world. Master various fighting techniques and special moves to become the ultimate streets fighter!'), ('Tetris Titans', 'Arrange falling blocks into complete rows to clear them from the screen. Keep up with the increasing speed and complexity as the blocks fall faster and faster!'), ('Galactic Invaders', 'Defend Earth from an alien invasion by shooting down waves of enemy spacecraft before they reach the planets surface. Upgrade your ship and weapons to increase your chances of survival!'), ('Arkanoid Adventures', 'Control a paddle at the bottom of the screen to bounce a ball off colorful blocks suspended in space. Break all the blocks to advance to the next level, but watch out for tricky power-ups and obstacles!'), ('Frogger Frolic', 'Help a brave frog cross busy roads and treacherous rivers to reach its home safely. Avoid cars, trucks, and other hazards while hopping across logs and floating platforms!'), ('Centipede Crawl', 'Defend your garden from a relentless onslaught of giant centipedes, spiders, and other creepy crawlies. Use your trusty bug blaster to shoot them down before they overrun your territory!');