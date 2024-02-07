import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SingleGamePage() {
    // const leaderboard = useSelector((store) => store.leaderboardReducer)
    const gameLeaderboard = useSelector((store) => store.gameleaderboardReducer)

    return (
        <div>
        <h3>{gameLeaderboard[0].name}</h3>
        <img src={gameLeaderboard[0].img_url}/>
        
        <div>
            {gameLeaderboard?.map(score => {
                return(
                    <div key={score.id}>
                    <h3>{score.username}: {score.scores}</h3>
                    <h5>Time: {score.time} Date:{score.date} </h5>
                    
                    </div>
                    
                )
                
            })}
        </div>
        </div>
    )
}

export default SingleGamePage