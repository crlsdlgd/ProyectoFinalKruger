import { LocalStorageService } from "./localStorageService";

export class FlatService {
  constructor() {
    this.url = 'http://localhost:8080/flat';
  }

  async getAllFlats(filters, pathname) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    if (filters === '') {
      filters = '?';
    } else {
      filters = `${filters}&`;
    }
    let uri = `${this.url}/${filters}`;
    switch (pathname) {
      case '/my-flats':
        uri = `${uri}pathname=my-flats`;
        break;
      case '/favorites':
        uri = `${uri}pathname=favorites`;
        break;
      default:
        uri = `${uri}pathname=home`;
        break;
    }
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  async getFlatCities() {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/cities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  async getTotalPages() {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/total-pages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  async getFlatById(flatId) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/${flatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
}