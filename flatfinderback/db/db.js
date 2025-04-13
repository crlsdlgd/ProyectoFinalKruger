//este archivo se encarga de realizar la conexin a la base de datos
//para hacer la conexion utilizaremos mongoose
import mongoose from "mongoose";
import configs from "../configs/configs.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${configs.MONGO_USER_DB}:${configs.MONGO_PASSWORD_DB}@${configs.MONGO_HOST_DB}/${configs.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=ClusterBackend3raCD`
    );
    console.log("Conectado a mongodb");
  } catch (error) {
    console.error("Error al conectar la base de datos", error);
  }
}