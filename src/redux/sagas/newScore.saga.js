import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * newScorePost(action) {
    try{
        yield axios.post('api/leaderboardGame', action.payload)
        yield put({type:"FETCH_LEADERBOARD_GAME"})
    } catch (error) {
        console.log("error inside newScorePost", error);
    }
}
function * newScoreSaga() {
    yield takeLatest('ADD_SCORE', newScorePost)
}
export default newScoreSaga;