import { calculateAge } from "../utils/utils.js";

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, password, birthdate } = req.body;
  if (!firstname || !lastname || !email || !password || !birthdate) {
    return res.status(400).json({ message: "All fields are required." });
  }
  //Validacion de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  //Validacion de contraseña
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({ message: "Min 6 chars, incl. letter, number & symbol" });
  }
  //validacion de edad(18 a 120 años)
  const age = calculateAge(birthdate);
  if (age < 18 || age > 120) {
    return res.status(400).json({ message: "Age must be between 18 and 120." });
  }

  next();
}

export default validateUser;