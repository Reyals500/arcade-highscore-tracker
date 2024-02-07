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
    SELECT "Game_table".name, "Game_table".img_url, "Game_table".overview_text, "user".username, 	"Leaderboard".scores, "Leaderboard".date, "Leaderboard".time FROM "Game_table"
    JOIN "Leaderboard" ON "Game_table".id = "Leaderboard".game_id
    JOIN "user" ON "user".id = "Leaderboard".user_id
    WHERE "Game_table".id = $1
    GROUP BY "Game_table".name, "Game_table".img_url, "Game_table".overview_text, "user".username, 	"Leaderboard".scores, "Leaderboard".date, "Leaderboard".time
    ORDER BY "user".username ASC;
    `
    pool.query(queryText, [queryParams]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("Error in '/:id' GET", error);
        res.sendStatus(500)
    })
})
module.exports = router;