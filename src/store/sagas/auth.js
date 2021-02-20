import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

export function* authLogout() {
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('token');
    yield put(actions.authLogOutSucceed());
}