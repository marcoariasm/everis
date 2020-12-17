import {
  always,
  assoc,
  equals,
  has,
  ifElse,
  includes,
  is,
  isEmpty,
  isNil,
  mergeRight,
  pipe,
  prop,
  propOr,
  reject,
  test,
  toString,
} from 'ramda';
import AppSession from './AppSession';

const REFRESH_TOKEN_PATH = `${process.env.REACT_APP_API_PROCEDURES}/excluded/token/refresh`;
const LOGIN_PATH = '/auth/login';

const defaultHeaders = {
  'Content-Type': 'application/json',
};
const defaultMethod = 'GET';

const logout = () => {
  AppSession.destroy();
  // window.location.reload();
  window.location.href = '/login';
};

const getSessionFromProvider = () => AppSession.getUser();
const createSessionFromProvider = ({ user }) => AppSession.createUser(user);

const addAuth = (headers, authenticated) => {
  const sessionUser = getSessionFromProvider();
  return ifElse(
    () => authenticated,
    assoc('Authorization', `Bearer ${prop('accessToken', sessionUser)}`),
    (value) => value,
  )(headers);
};

const generateNormalOptions = (authenticated) => (requestOptions) => (
  reject(isNil, {
    method: propOr(defaultMethod, 'method', requestOptions),
    headers: mergeRight(addAuth(defaultHeaders, authenticated), prop('headers', requestOptions)),
    body: ifElse(has('body'), pipe(prop('body'), toString), always(null))(requestOptions),
  })
);

const generateFormDataOptions = (authenticated) => (requestOptions) => (
  reject(isNil, {
    method: propOr(defaultMethod, 'method', requestOptions),
    headers: mergeRight(addAuth({}, authenticated), prop('headers', requestOptions)),
    body: prop('body', requestOptions),
  })
);

const requestUrl = ifElse(
  test(/(https?:\/\/)/g),
  (value) => value,
  (value) => `${process.env.REACT_APP_API_URL}${value}`,
);

const parseError = (errorResponse, res) => {
  const error = new Error(errorResponse.error);
  error.message = ifElse(
    has('errorMessage'),
    prop('errorMessage'),
    prop('message'),
  )(errorResponse);
  error.status = res.status;
  error.data = errorResponse;
  return error;
};

const validatedRolesUser = (url, response) => {
  const isRoles = url.includes('/my-roles');

  if (isRoles && response.status === 401) {
    return true;
  }
  return false;
};

const validatedLogin = (url, response) => {
  const isAuth = url.includes('/auth/login');

  if (isAuth && response.status === 500) {
    return true;
  }
  return false;
};

const supportEmptyResponse = async (response) => {
  const clonedResponse = await response.clone();
  const contentText = await clonedResponse.text();
  return isEmpty(contentText) ? contentText : response.json();
};

const serviceFetcher = async (url, requestOptions) => {
  const authenticated = propOr(true, 'authenticated', requestOptions);

  const options = ifElse(
    pipe(prop('body'), is(FormData)),
    generateFormDataOptions(authenticated),
    generateNormalOptions(authenticated),
  )(requestOptions);

  const res = await fetch(requestUrl(url), options);
  const resRoles = validatedRolesUser(url, res);
  const resLogin = validatedLogin(url, res);

  if (resRoles) {
    return Promise.reject({ code: 401 });
  }

  if (resLogin) {
    return Promise.reject({ code: 500 });
  }

  if (res.status !== 200) {
    if (res.status === 202) {
      return res.clone();
    }
    if (res.status === 204) {
      return res.text();
    }
    if (res.status === 403) {
      const errorText = await res.json();
      throw errorText;
    }
    if (includes(REFRESH_TOKEN_PATH, url)) {
      logout();
    }
    if (equals(prop('status', res), 401) && !includes(LOGIN_PATH, url)) {
      try {
        await refreshFetch();
        return serviceFetcher(url, requestOptions);
      } catch (error) {
        console.error('logout', error);
        logout();
      }
    } else {
      const errorText = await res.text();

      if (isEmpty(errorText)) {
        return errorText;
      }

      const errorResponse = await res.json();
      throw parseError(errorResponse, res);
    }
  }
  return supportEmptyResponse(res);
};

const refreshFetch = async () => {
  const sessionUser = getSessionFromProvider();
  const user = await serviceFetcher(REFRESH_TOKEN_PATH, {
    method: 'POST',
    body: {
      refreshToken: prop('refreshToken', sessionUser),
    },
    authenticated: false,
  });
  createSessionFromProvider({ user });
};

export default serviceFetcher;
