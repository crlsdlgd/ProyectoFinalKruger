import express from "express";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { authorizationByRoles, authorizationByRolesOrAuthor } from "../middlewares/authorization.middleware.js";
import { validateUserData } from "../middlewares/validateUserData.middleware.js";
import { sanitizeBody, removeFieldFromBody } from "../middlewares/sanitizeBody.middleware.js";
import { saveUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/", sanitizeBody, validateUserData, saveUser);
router.get("/", authenticationMiddleware, authorizationByRoles(["admin"]), getAllUsers);
router.post("/login", sanitizeBody, loginUser);
router.get("/:id", authenticationMiddleware, getUserById);
router.patch("/:id", authenticationMiddleware, authorizationByRolesOrAuthor(["admin"]), sanitizeBody, removeFieldFromBody("password"), validateUserData, updateUser);
router.delete("/:id", authenticationMiddleware, authorizationByRolesOrAuthor(["admin"]), deleteUser);

export default router;


