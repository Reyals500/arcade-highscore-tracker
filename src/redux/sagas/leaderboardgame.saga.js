import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * fetchLeaderboardGame(action) {
    try{
        const gamelbresponse = yield axios.get(`/api/leaderboardGame/${action.payload}`)
        yield put ({type: 'SET_GAME_ID', payload: action.payload})
        yield put ({type: 'SET_GAME_LEADERBOARD', payload: gamelbresponse.data})
    }catch(error) {
        console.log('fetchLeaderboardGame error: ', error);
    }
}

function * leaderboardgameSaga() {
    yield takeLatest('FETCH_LEADERBOARD_GAME', fetchLeaderboardGame)
}
export default leaderboardgameSaga;