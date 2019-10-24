import { call, put } from 'redux-saga/effects';

import axios from 'axios';

import { loginSuccess } from '../actions/user';

export function* login(action) {

    const { data } = yield call(axios.get, 'https://app.fakejson.com/q/i6NeJblj?token=f-pKqT_sDSy6nvRp9ELcWQ');

    yield put( loginSuccess(data) );
}