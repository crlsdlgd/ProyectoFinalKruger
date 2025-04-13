import express from "express";
// import authenticationMiddleware from "../middlewares/authentication.middleware.js";
// import authorizationMiddleware from "../middlewares/authorization.middleware.js";
import { saveUser } from "../controllers/user.controller.js";
import validateUser from "../middlewares/validateUser.middleware.js";
const router = express.Router();

router.post("/", validateUser, saveUser);
// router.get("/:id", authenticationMiddleware, getUser);
// router.get("/", authenticationMiddleware, authorizationMiddleware(["admin"]), getAllUsers);
// router.put("/:id", authenticationMiddleware, authorizationMiddleware(["admin"]), updateUser);
// router.delete("/:id", authenticationMiddleware, authorizationMiddleware(["admin"]), deleteUser);

export default router;