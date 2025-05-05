import { calculateAge } from "../utils/utils.js";

export const validateUserData = (req, res, next) => {
  const { firstname, lastname, email, password, birthdate } = req.body;
  //Validacion de datos requeridos
  // if (!firstname || !lastname || !email || !password || !birthdate) { // Esto ya lo valida el user.schema en user.model.js
  //   return res.status(400).json({ message: "All fields are required." });
  // }

  //Validacion de formato de email
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
  }

  //Validacion de contraseña segura
  if (password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Min 6 chars, incl. letters, numbers and special chars" });
    }
  }
  //validacion de edad(18 a 120 años)
  if (birthdate) {
    const age = calculateAge(birthdate);
    if (age < 18 || age > 120) {
      return res.status(400).json({ message: "Age must be between 18 and 120." });
    }
  }

  next();
}