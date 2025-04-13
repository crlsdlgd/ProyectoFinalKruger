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
}