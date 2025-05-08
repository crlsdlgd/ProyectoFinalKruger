export class LocalStorageService {
  constructor() {
    this.localStorage = window.localStorage;
  }

  saveToken(token) {
    this.localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    const token = this.localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  removetoken() {
    this.localStorage.removeItem('token');
  }
}