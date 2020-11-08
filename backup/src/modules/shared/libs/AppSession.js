
const SESSION_NAME = 'user';

export default class AppSession {
  static create(user) {
    sessionStorage.setItem(SESSION_NAME, JSON.stringify(user))
  }
  static get() {
    return JSON.parse(sessionStorage.getItem(SESSION_NAME));
  }
  static destroy() {
    sessionStorage.removeItem(SESSION_NAME);
  }
};