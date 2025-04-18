import express from "express";
import { addFlat, getFlatById, getAllFlats, updateFlat, deleteFlat } from "../controllers/flat.controller.js";

const router = express.Router();

router.get("/", getAllFlats);
router.patch("/:id", updateFlat);
router.delete("/:id", deleteFlat);
router.post("/", addFlat);
router.get("/:id", getFlatById);

export default router;