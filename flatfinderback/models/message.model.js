import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: { type: String, required: [true, "Content is required"] },
  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flats",
    required: [true, "Flat ID is required"],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Sender ID is required"],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
});

export const Message = mongoose.model("messages", messageSchema);
