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

  async getAllFlats() {
    //esta funcion envia el token al backend para que lo valide y devuelva los flats
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("RESPONSE", response);
    return response.json();
  }
}