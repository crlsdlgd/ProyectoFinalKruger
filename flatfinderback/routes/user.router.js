import express from "express";
// import authenticationMiddleware from "../middlewares/authentication.middleware.js";
// import authorizationMiddleware from "../middlewares/authorization.middleware.js";
import { saveUser, loginUser } from "../controllers/user.controller.js";
import validateUser from "../middlewares/validateUser.middleware.js";
import { sanitizeBody } from "../middlewares/sanitizeBody.middleware.js";
const router = express.Router();

router.post("/", validateUser, sanitizeBody, saveUser);
router.post("/login", loginUser);
// router.get("/:id", authenticationMiddleware, getUser);
// router.get("/", authenticationMiddleware, authorizationMiddleware(["admin"]), getAllUsers);
// router.put("/:id", authenticationMiddleware, authorizationMiddleware(["admin"]), updateUser);
// router.delete("/:id", authenticationMiddleware, authorizationMiddleware(["admin"]), deleteUser);

export default router;


