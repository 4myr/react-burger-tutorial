import * as authActions from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialStore = {
    loading: false,
    error: null,
    isAuthenticated: localStorage.getItem('token') ? true : false
}

const authStart = (state) => updateObject(state, {loading: true});
const authSuccess = (state) => updateObject(state, {loading: false, isAuthenticated: true});
const authFail = (state, error) => updateObject(state, {loading: false, error: error});
const authLogout = (state) => updateObject(state, {isAuthenticated: false});

export const authReducer = (store = initialStore, action) => {
    switch(action.type) {
        case authActions.AUTH_START: return authStart(store);
        case authActions.AUTH_SUCCESS: return authSuccess(store);
        case authActions.AUTH_FAIL: return authFail(store, action.error);
        case authActions.AUTH_LOGOUT: return authLogout(store);
        default: return store;
    }
}