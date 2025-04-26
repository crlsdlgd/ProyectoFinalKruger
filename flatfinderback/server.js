import express from "express";
import cors from "cors";
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.router.js";
import flatRouter from "./routes/flat.router.js";

const app = express();

app.use(express.json());
connectDB();

app.use(cors());

app.use("/user", userRouter);
app.use("/flat", flatRouter);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
