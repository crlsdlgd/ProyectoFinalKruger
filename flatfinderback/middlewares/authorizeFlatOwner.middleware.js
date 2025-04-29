import { getFlatOwnerId } from "../repository/flat.repository.js";

export const authorizeFlatOwner = async (req, res, next) => {
  try {
    const flat = await getFlatOwnerId(req.params.flatId);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }
    if (flat.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};