import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * fetchLeaderboardGame(action) {
    try{
        yield axios.get(`/api/leaderboard/${action.payload}`)
        yield put ({type: 'SET_GAME_ID', payload: action.payload})
        yield put ({type: 'SET_LEADERBOARD'})
    }catch(error) {
        console.log('fetchLeaderboardGame error: ', error);
    }
}

function * leaderboardSaga() {
    yield takeLatest('FETCH_LEADERBOARD_GAME', fetchLeaderboardGame)
}
export default leaderboardSaga;