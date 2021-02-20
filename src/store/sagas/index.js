import takeEvery from 'redux-saga';
import { authLogout } from './auth';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIAL_LOGOUT, authLogout)
}

