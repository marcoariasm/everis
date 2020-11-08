import SharedModule from 'modules/shared/index';
const { libs: { AppSession, ServiceFetcher } } = SharedModule;

export const userService = {
  login,
  logout,
  refresh,
  loadDocumentsTypes
}

function loadDocumentsTypes(){
  return ServiceFetcher('/excluded/information/id-document/types', {
    method: 'GET',
    authenticated: false,
  });
}

function login(captchaToken, documentType, document, password) {
  return ServiceFetcher('/auth/login', {
    method: 'POST',
    body: {captchaToken, documentType, document, password},
    authenticated: false,
  })
    .then(user => {
        AppSession.create(user);
        return user
    });
}

function logout() {
  AppSession.destroy();
  //window.location.href = '/login'
}

function refresh() {
  const user = AppSession.get();

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.accessToken},
    body: JSON.stringify(
      {
        grant_type: 'refresh_token', refresh_token: user.refresh_token,
      },
    ),
  }

  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, requestOptions).
  then(handleResponse).
  then(user => {
    AppSession.create(user);
    return user
  })
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        this.refresh()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}