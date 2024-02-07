const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/leaderboard route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `
    SELECT "Game_table".name, "Leaderboard".scores, "Leaderboard".date, "Leaderboard".time FROM "Game_table"
    JOIN "Leaderboard" ON "Game_table".id = "Leaderboard".game_id
    JOIN "user" ON "user".id = "Leaderboard".user_id
    WHERE "user".id = $1
    GROUP BY "Game_table".name, "Leaderboard".scores, "Leaderboard".date, "Leaderboard".time
    ORDER BY "Game_table".name ASC;
    `
    let queryParams = [req.user.id]
    pool.query(queryText, queryParams).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in leaderboard GET',error);
        res.sendStatus(500)
    })
})

module.exports = router;