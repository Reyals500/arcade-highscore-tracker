import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditForm from '../EditScorePage/EditScorePage';

function SingleGamePage() {
    // const leaderboard = useSelector((store) => store.leaderboardReducer)
    const gameLeaderboard = useSelector((store) => store.gameleaderboardReducer)
    const leaderboardgame = useSelector((store) => store.leaderboardgameReducer)
    const games = useSelector((store) => store.gameReducer)
    const [newScore, setNewScore] = useState({game_id: '', scores: '', date: '', time: '' })
    const dispatch = useDispatch();
    const history = useHistory();
    

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
    const deleteScore = (event) => {
        console.log("Clicked the delete button!", event.target.id);
        const payload = event.target.id
        dispatch({type: 'DELETE_SCORE', payload})
        dispatch({type: 'FETCH_LEADERBOARD_GAME', payload: leaderboardgame})

    }   
    const editScore = (event) => {
        console.log("Clicked the edit button!", event.target.id);
        const payload = event.target.id
        dispatch({type: 'FETCH_UPDATE', payload})
        history.push('/editScore')
    }
    // useEffect(() => {
    //     dispatch({ type: 'FETCH_LEADERBOARD_GAME', payload: leaderboardgame})
    // }, [])

    return (
        <div>
        <h3>{gameLeaderboard[0]?.name}</h3>
        <img src={gameLeaderboard[0]?.img_url}/>
        <h4>{gameLeaderboard[0]?.overview_text}</h4>
        
        <div>
            {gameLeaderboard?.map(score => {
                return(
                    <div>
                    <h3>{score.username}: {score.scores}</h3>
                    <h5>Time: {score.time} Date:{score.date} </h5>
                    <button id={score.id} onClick={(event) => editScore(event)}>Edit</button>
                    <button id={score.id} onClick={deleteScore}>Delete</button>
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