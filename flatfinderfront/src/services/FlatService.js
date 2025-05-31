import { LocalStorageService } from "./localStorageService";

export class FlatService {
  constructor() {
    this.url = 'http://localhost:8080/flat';
  }

  // async saveFlat(flat) {
  //   const response = await fetch(`${this.url}/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(flat)
  //   });
  //   const data = await response.json();
  //   if (!response.ok) {
  //     throw new Error(data.message || "Unknown error");
  //   }
  //   return data;
  // }

  // async getFlat(id) {
  //   const response = await fetch(`${this.url}/${id}`, {
  //     method: `GET`,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   return response.json();
  // }

  async getAllFlats(filters) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/${filters}`, {
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
}