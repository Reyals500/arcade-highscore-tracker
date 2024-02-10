const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log("req.params.id", req.params.id);
    const queryParams = req.params.id
    let queryText = `
    SELECT "Game_table".name, "Game_table".img_url, "Game_table".overview_text, "user".username, "Leaderboard".id ,"Leaderboard".scores, "Leaderboard".date, "Leaderboard".time FROM "Game_table"
    JOIN "Leaderboard" ON "Game_table".id = "Leaderboard".game_id
    JOIN "user" ON "user".id = "Leaderboard".user_id
    WHERE "Game_table".id = $1
    GROUP BY "Game_table".name, "Game_table".img_url, "Game_table".overview_text, "user".username, "Leaderboard".id	,"Leaderboard".scores, "Leaderboard".date, "Leaderboard".time
    ORDER BY "user".username ASC;
    `
    pool.query(queryText, [queryParams]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("Error in '/:id' GET", error);
        res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const newScore = req.body;
    console.log("newScore", newScore);
    const queryText = `
    INSERT INTO "Leaderboard"
    ("user_id", "game_id", "scores", "date", "time")
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING "game_id";
    `;
    const queryValues = [
        req.user.id,
        newScore.game_id,
        newScore.scores,
        newScore.date,
        newScore.time
    ];
    pool.query(queryText, queryValues)
    .then((result) => {
        const gameID = result.rows[0].game_id
        res.status(201).json({gameID}); })
    .catch((error) => {
        console.log("Error in POST /api/leaderboardGame", error);
        res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
    const queryText = `
      DELETE FROM "Leaderboard" 
        WHERE id=$1
    `;
    pool.query(queryText, [req.params.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error in DELETE /api/leaderboardGame/:id', err);
        res.sendStatus(500);
      });
  });
  router.put('/:id', (req, res) => {
    // Update this single student
    const idToUpdate = req.params.id;
    const sqlText = `UPDATE "Leaderboard" SET scores = $1 WHERE id = $2`;

    pool.query(sqlText, [req.body.scores, idToUpdate])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});
module.exports = router;