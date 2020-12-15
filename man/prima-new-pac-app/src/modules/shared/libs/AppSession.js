const SESSION_NAME = 'user';
const SESSION_ROLE_NAME = 'roles';

export default class AppSession {
  static createUser(user) {
    sessionStorage.setItem(SESSION_NAME, JSON.stringify(user));
  }

  static createRoles(roles) {
    sessionStorage.setItem(SESSION_ROLE_NAME, JSON.stringify(roles));
  }

  static getUser() {
    return JSON.parse(sessionStorage.getItem(SESSION_NAME));
  }

  static getRoles() {
    return JSON.parse(sessionStorage.getItem(SESSION_ROLE_NAME));
  }

  static destroy() {
    sessionStorage.removeItem(SESSION_NAME);
    sessionStorage.removeItem(SESSION_ROLE_NAME);
  }
}
