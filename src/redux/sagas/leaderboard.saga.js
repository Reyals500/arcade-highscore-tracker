import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * fetchLeaderboard() {
    try{
        const leaderboardResponse = yield axios.get(`/api/leaderboard/`)
        yield put ({type: 'SET_LEADERBOARD', payload: leaderboardResponse.data})
    }catch(error) {
        console.log('fetchLeaderboard error: ', error);
    }
}

function * leaderboardSaga() {
    yield takeLatest('FETCH_LEADERBOARD', fetchLeaderboard)
}
export default leaderboardSaga;