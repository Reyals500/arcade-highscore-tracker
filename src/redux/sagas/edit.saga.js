import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * scoreEdit(action){
    try{
        const leaderboardResponse = yield axios.get(`/api/leaderboard/${action.payload}`)
        yield put ({type: 'SET_EDIT', payload: leaderboardResponse.data})
    }catch (error) {
        console.log("error inside scoreDelete", error);
    }

}
function * scoreEditSaga(){
    yield takeLatest('FETCH_UPDATE', scoreEdit)
}
export default scoreEditSaga