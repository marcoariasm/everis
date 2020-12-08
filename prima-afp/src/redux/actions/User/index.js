import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_APPLICANT, AUTH_TOKEN_SESSION } from 'redux/types/Auth';

export const AUTH_Success = (user) => ({
  type: AUTH_SUCCESS,
  payload: user
});

export const AUTH_Logout = () => ({
  type: AUTH_LOGOUT
});

export const AUTH_applicant = (id) => ({
  type: AUTH_APPLICANT,
  payload: id
});

export const AUTH_TOKEN_session = (sessionObj) => ({
  type: AUTH_TOKEN_SESSION,
  payload: sessionObj
});
