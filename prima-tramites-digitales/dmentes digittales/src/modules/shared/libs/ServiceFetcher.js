import {
  propOr,
  toString,
  assoc,
  ifElse,
  is,
  pipe, prop, has, equals, includes, mergeRight, always, reject, isNil, test,
} from 'ramda';
import AppSession from './AppSession';
const REFRESH_TOKEN_PATH = '/excluded/token/refresh';
const LOGIN_PATH = '/auth/login';

const defaultHeaders = {
  'Content-Type': 'application/json',
};
const defaultMethod = 'GET';

const logout = () => {
  AppSession.destroy();
  window.location.reload();
  //window.location.href = '/login';
};

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

const getSessionFromProvider = () => AppSession.get();
const createSessionFromProvider = ({ user }) => AppSession.create(user);

const serviceFetcher = async (url, requestOptions) => {
  const authenticated = propOr(true, 'authenticated', requestOptions);

  const options = ifElse(
    pipe(prop('body'), is(FormData)),
    generateFormDataOptions(authenticated),
    generateNormalOptions(authenticated),
  )(requestOptions);

  const res = await fetch(requestUrl(url), options);

  if (res.status !== 200) {
    if (res.status === 202) {
      return res.clone();
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
      const errorResponse = await res.json();
      const error = parseError(errorResponse, res);
      throw error;
    }
  }
  return res.json();
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
