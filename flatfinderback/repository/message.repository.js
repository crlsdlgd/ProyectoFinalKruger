import { Message } from "../models/message.model.js";

const getMessagesByFlat = async (query) => {
  return await Message.find(query)
    .sort({ createdAt: -1 })
    .populate("senderId", "firstname lastname email");
};
const getMessagesByFlatAndSender = async (flatId, senderId) => {
  return await Message.find({ flatId, senderId, deletedAt: null });
};
const addMessage = async (flatId, content, senderId) => {
  const message = new Message({ flatId, createdAt: Date.now(), updatedAt: Date.now(), ...content, senderId });
  return await message.save();
};
export { getMessagesByFlat, getMessagesByFlatAndSender, addMessage };
