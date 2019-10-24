import { call, put, select } from 'redux-saga/effects';

import axios from 'axios';

import { Creators as UserActions } from '../ducks/user';

export function* login(action) {

    try
    {
        const response = yield call(axios.get, 'https://app.fakejson.com/q/i6NeJblj?token=f-pKqT_sDSy6nvRp9ELcWQ');
        // const response = yield call(axios.get, 'https://app.fakejson.com/q/i6NeJblj?token=f-pKqT_sDSy6nvRp9ELcWQQ');

        const isLogged = yield select(state => (state.user.data && state.user.data.user_name) !== null);

        if(isLogged)
        {
            yield put( UserActions.loginFailure({ message: "Você já está logado!" }) );
        }

        if(response.data.user_name == null)
        {
            yield put( UserActions.loginFailure(response.message ? response.message : response.data) );
        }

        yield put( UserActions.loginSuccess(response.data) );
    }
    catch (error)
    {
        yield put( UserActions.loginFailure(error) );
    }
}