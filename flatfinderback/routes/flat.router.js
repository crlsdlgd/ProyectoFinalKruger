import express from "express";
import {
  addFlat,
  getFlatById,
  getAllFlats,
  updateFlat,
  deleteFlat,
} from "../controllers/flat.controller.js";
import {
  getAllMessages,
  getUserMessages,
  addMessage,
} from "../controllers/message.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";


const router = express.Router();

//FLATS ROUTES
router.get("/", getAllFlats);
router.patch("/:id", updateFlat);
router.delete("/:id", deleteFlat);
router.post("/", addFlat);
router.get("/:id", authenticationMiddleware,getFlatById);

//MESSAGES ROUTES
router.get("/:flatId/messages", getAllMessages);
router.get("/:flatId/messages/:senderId", getUserMessages);
router.post("/:flatId/messages", addMessage);

export default router;
