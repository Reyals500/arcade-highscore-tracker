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