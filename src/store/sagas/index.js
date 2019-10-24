import { all, takeLatest } from 'redux-saga/effects'

import { login } from './user';

export default function* rootSaga() {
    yield all([
        takeLatest('LOGIN_REQUEST', login)
    ]);
}