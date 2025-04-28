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

router.use(authenticationMiddleware);

// MESSAGES ROUTES
router.get("/:flatId/messages", getAllMessages);
router.get("/:flatId/messages/:senderId", getUserMessages);
router.post("/:flatId/messages", addMessage);

// FLATS ROUTES
router.get("/", getAllFlats);
router.post("/", addFlat);
router.get("/:flatId", getFlatById);
router.patch("/:flatId", updateFlat);
router.delete("/:flatId", deleteFlat);


export default router;
