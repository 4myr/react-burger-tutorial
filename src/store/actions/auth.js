import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const authStart = (email, password, isSignup) => {
    const method = isSignup ? 'accounts:signUp' : 'accounts:signInWithPassword';
    const data = {
        email: email,
        password: password
    }
    return dispatch => {
        dispatch(authInit());
        axios.post("https://identitytoolkit.googleapis.com/v1/" + method + "?key=AIzaSyCxA5pbxVqq-eKSIGrHELRBbn6ehQ0hmbA", data).then(resp => {
            dispatch(authSuccess());
            localStorage.setItem('token', resp.data.idToken);
            localStorage.setItem('userId', resp.data.localId);
            localStorage.setItem('expirationTime', new Date());
            dispatch(checkAuthTimeout(10));
        }).catch(err => {
            dispatch(authFail(err.response.data.error.message));
        });
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut());
        }, expirationTime * 1000);
    }
}
export const authLogOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authInit = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
}
export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}