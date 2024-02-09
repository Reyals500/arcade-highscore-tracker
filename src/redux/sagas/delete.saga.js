import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * scoreDelete(action){
    try{
        yield axios.delete(`api/leaderboardGame/${action.payload}`)

    }catch (error) {
        console.log("error inside scoreDelete", error);
    }

}
function * scoreDeleteSaga(){
    yield takeLatest('DELETE_SCORE', scoreDelete)
}
export default scoreDeleteSaga