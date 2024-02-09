import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * newScorePost(action) {
    try{
        const response = yield axios.post('api/leaderboardGame', action.payload)
        const gameID = response.data.gameID
        console.log("ID",gameID);
        yield put({type:"FETCH_LEADERBOARD_GAME", payload: gameID})
    } catch (error) {
        console.log("error inside newScorePost", error);
    }
}
function * newScoreSaga() {
    yield takeLatest('ADD_SCORE', newScorePost)
}
export default newScoreSaga;