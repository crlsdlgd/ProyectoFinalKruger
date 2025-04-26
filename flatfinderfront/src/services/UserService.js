import { calendarToISOString } from "../utils/utils";

export class UserService {
  constructor() {
    this.url = 'http://localhost:8080/user';
  }

  async saveUser(user) {
    user.birthdate = calendarToISOString(user.birthdate);
    console.log("Usuario Enviado", user)
    const response = await fetch(`${this.url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    return response.json();
  }

  async getUser(id) {
    const response = await fetch(`${this.url}/${id}`,{
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
    console.log("Usuario Enviado", email, password)
    // const response = await fetch(`${this.url}/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email, password })
    // });
    // return response.json();
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
};


