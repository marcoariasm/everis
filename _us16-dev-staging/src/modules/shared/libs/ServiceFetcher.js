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

const defaultHeaders = {
  'Content-Type': 'application/json',
};
const defaultMethod = 'GET';

const logout = () => {
  AppSession.destroy();
  //window.location.href = '/login';
};

const addAuth = (headers, authenticated) => {
  const sessionUser = AppSession.get();
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

const serviceFetcher = async (url, requestOptions) => {
  const authenticated = propOr(true, 'authenticated', requestOptions);

  const options = ifElse(
    pipe(prop('body'), is(FormData)),
    generateFormDataOptions(authenticated),
    generateNormalOptions(authenticated),
  )(requestOptions);

  const res = await fetch(requestUrl(url), options);
  if (equals(prop('status', res), 401)) {
    if (includes(REFRESH_TOKEN_PATH, url)) {
      logout();
    } else {
      try {
        await refreshFetch();
        return serviceFetcher(url, requestOptions);
      } catch (error) {
        console.error('logout', error);
        logout();
      }
    }
  } else if (res.status !== 200) {
    const errorResponse = await res.json();
    const error = new Error(errorResponse.error);
    error.message = ifElse(
      has('errorMessage'),
      prop('errorMessage'),
      prop('message'),
    )(errorResponse);
    error.status = res.status;
    error.data = errorResponse;
    throw error;
  }
  return res.json();
};

const refreshFetch = async () => {
  const sessionUser = AppSession.get();
  const user = await serviceFetcher(REFRESH_TOKEN_PATH, {
    method: 'POST',
    body: {
      refreshToken: prop('refreshToken', sessionUser),
    },
    authenticated: false,
  });
  AppSession.create(user);
};

export default serviceFetcher;
