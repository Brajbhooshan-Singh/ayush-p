import { all, put, takeLatest } from 'redux-saga/effects';

function* setUserLogout() {
    yield put(
        { type: 'SET_USER_LOGOUT', payload: null }
    )
}

function* actionWatcher() {
    yield takeLatest('SET_USER_LOGOUT', setUserLogout());
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}