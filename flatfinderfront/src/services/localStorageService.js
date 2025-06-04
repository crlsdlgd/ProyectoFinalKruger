export class LocalStorageService {
  constructor() {
    this.localStorage = window.localStorage;
  }

  saveToken(token) {
    this.localStorage.setItem('token', JSON.stringify(token));
  }

  saveUser(user) {
    this.localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    const token = this.localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }
  getUser() {
    const user = this.localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeToken() {
    this.localStorage.removeItem('token');
  }
  removeUser() {
    this.localStorage.removeItem('user');
  }
}