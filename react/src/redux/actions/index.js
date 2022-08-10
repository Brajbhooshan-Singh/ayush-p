import * as types from './actionConstants';

export const setUser = (payload)=>({
    type: types.SET_USER,
    payload
});

export const setUserLogout = (payload)=>({
    type: types.SET_USER_LOGOUT,
    payload
});