import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SingleGamePage() {
    // const leaderboard = useSelector((store) => store.leaderboardReducer)
    const gameLeaderboard = useSelector((store) => store.gameleaderboardReducer)
    const leaderboardgame = useSelector((store) => store.leaderboardgameReducer)
    const [newScore, setNewScore] = useState({game_id: '', scores: '', date: '', time: '' })

    const dispatch = useDispatch();

    const handleScoreChange = (event) => {
        setNewScore({
            ...newScore,
            scores: event.target.value
        })
    }
    const handleDateChange = (event) => {
        setNewScore({
            ...newScore,
            date: event.target.value
        })
    }
    const handleTimeChange = (event) => {
        setNewScore({
            ...newScore,
            time: event.target.value
        })
    }
    const addNewScore = (event) => {
        event.preventDefault();
        const payload = {
            game_id: leaderboardgame, 
            scores: newScore.scores, 
            date: newScore.date,
            time: newScore.time
        }
        dispatch({type: 'ADD_SCORE', payload})
        setNewScore({game_id: '', scores: '', date: '', time: '' })
    }

    return (
        <div>
        <h3>{gameLeaderboard[0].name}</h3>
        <img src={gameLeaderboard[0].img_url}/>
        <h5>{gameLeaderboard[0].overview_text}</h5>
        
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
        <form onSubmit={(event) => addNewScore(event)}>
            <input 
            type="text" 
            onChange={handleScoreChange}
            placeholder='Score'
            value={newScore.scores}
            />
            <input 
            type="text"
            onChange={handleDateChange}
            placeholder='Date'
            value={newScore.date}
            />
            <input 
            type="text"
            onChange={handleTimeChange}
            placeholder='Time'
            value={newScore.time}
            />
        <button type='submit'>POST NEW SCORE</button>
        </form>
        
        </div>
    )
}

export default SingleGamePage 