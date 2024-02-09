import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function * fetchGames() {
    try{
        const gamesResponse = yield axios.get('/api/games')
        yield put ({type: 'SET_GAMES', payload: gamesResponse.data})
    }catch(error) {
        console.log('fetchGames error: ', error);
    }
}

function * gameSaga() {
    yield takeEvery('FETCH_GAMES', fetchGames)
}
export default gameSaga;