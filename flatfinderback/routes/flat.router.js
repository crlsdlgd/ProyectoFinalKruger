import express from "express";
import {
  addFlat,
  getFlatById,
  getAllFlats,
  updateFlat,
  deleteFlat,
} from "../controllers/flat.controller.js";
import {
  getMessagesByFlat,
  getMessagesByFlatAndSender,
  addMessage,
} from "../controllers/message.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { authorizeFlatOwner } from "../middlewares/authorizeFlatOwner.middleware.js";
import { validateUserIsSender } from "../middlewares/validateUserIsSender.middleware.js";
import { sanitizeBody } from "../middlewares/sanitizeBody.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

// MESSAGES ROUTES
router.get("/:flatId/messages", authorizeFlatOwner, getMessagesByFlat); //Antes llamado getAllMessages, obtiene todos los mensajes de un flat (disponible para el owner del flat)
router.get("/:flatId/messages/:senderId", validateUserIsSender, getMessagesByFlatAndSender); //Antes llamado getUserMessages, obtiene solo los mensajes que un usuario a escrito sobre un flat (disponible para el sender del mensaje)
router.post("/:flatId/messages", sanitizeBody, addMessage);

// FLATS ROUTES
router.get("/", getAllFlats);
router.post("/", addFlat);
router.get("/:flatId", getFlatById);
router.patch("/:flatId", authorizeFlatOwner, sanitizeBody, updateFlat);
router.delete("/:flatId", authorizeFlatOwner, sanitizeBody, deleteFlat);

export default router;
