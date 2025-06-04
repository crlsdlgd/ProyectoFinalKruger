import { calendarToISOString } from "../utils/utils";
import { LocalStorageService } from "./localStorageService";

export class UserService {
  constructor() {
    this.url = 'http://localhost:8080/user';
  }

  async saveUser(user) {
    user.birthdate = calendarToISOString(user.birthdate);
    const response = await fetch(`${this.url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }
    return data;
  }

  async getUser(id) {
    const response = await fetch(`${this.url}/${id}`, {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json'

      }
    });
    return response.json();
  }

  async getAllUsers() {
    const response = await fetch(`${this.url}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
  async updateUser(id, user) {
    user.birthdate = calendarToISOString(user.birthdate);
    const response = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
  }
  async deleteUser(id) {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
  // async getUserByEmail(email) {
  //   const response = await fetch(`${this.url}/email/${email}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   return response.json();
  // }
  async loginUser(email, password) {
    const response = await fetch(`${this.url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const localStorageService = new LocalStorageService();
    localStorageService.saveToken(data.token);
    localStorageService.saveUser(data.user);
    return data;
  }

  async logoutUser() {
    const response = await fetch(`${this.url}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
  async getUserByToken(token) {
    const response = await fetch(`${this.url}/token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  async toggleFavorite(flatId) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/toggle-favorite/${flatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to toggle favorite");
    }
    const data = await response.json();
    localStorageService.saveUser(data);
  }
};


