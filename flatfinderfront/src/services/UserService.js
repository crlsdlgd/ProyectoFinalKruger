export class UserService {
  constructor() {
    this.url = 'http://localhost:8080/user';
  }

  async saveUser(user) {
    const { year, month, day } = user.birthdate;
    user.birthdate = new Date(year, month - 1, day).toISOString();
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