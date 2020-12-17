import { AUTH_SUCCESS, AUTH_LOGOUT } from 'redux/types/Auth'

export const AUTH_Success = (user) => ({
    type: AUTH_SUCCESS,
    payload: user
});

export const AUTH_Logout = () => ({
    type: AUTH_LOGOUT
});

