const SESSION_NAME = 'user';
const SESSION_REDUX = 'state';

export default class AppSession {
  static create(user) {
    sessionStorage.setItem(SESSION_NAME, JSON.stringify(user))
  }
  static get() {
    return JSON.parse(sessionStorage.getItem(SESSION_NAME));
  }
  static destroy(exitNavigation = true) {
    sessionStorage.removeItem(SESSION_NAME);
    sessionStorage.removeItem(SESSION_REDUX);
    if(exitNavigation) {
      window.location.reload();
    }
  }
};