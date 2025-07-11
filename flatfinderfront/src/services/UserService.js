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

  async getUserById(id) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/${id}`, {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

  async getAllUsers(filters) {
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
  async updateUser(id, user) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    user.birthdate = calendarToISOString(user.birthdate);
    const response = await fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    return response.json();
  }


  async deleteUser(id) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }

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

  async updatePassword(currentPassword, newPassword) {
    const localStorageService = new LocalStorageService();
    const token = localStorageService.getToken();
    const response = await fetch(`${this.url}/update-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }
    return data;
  }
};


