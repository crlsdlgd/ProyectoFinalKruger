//En este archivo de vamos a leer nuestras variables de abiente para luego usarlas
//en cuanquiel parte de nuestra app
export default {
  MONGO_USER_DB: process.env.MONGO_USER_DB,
  MONGO_PASSWORD_DB: process.env.MONGO_PASSWORD_DB,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_HOST_DB: process.env.MONGO_HOST_DB,
  JWT_SECRET: process.env.JWT_SECRET,
  MAILTRAP_USER: process.env.MAILTRAP_USER,
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
  MAILTRAP_HOST: process.env.MAILTRAP_HOST,
  MAILTRAP_PORT: process.env.MAILTRAP_PORT,
}