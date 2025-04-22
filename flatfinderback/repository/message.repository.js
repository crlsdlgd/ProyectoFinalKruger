import { Message } from "../models/message.model.js";

const getAllMessages = async (flatId) => {
  return await Message.find({ flatId, deletedAt: null });
};
const getUserMessages = async (flatId, senderId) => {
  return await Message.find({ flatId, senderId, deletedAt: null });
};
const addMessage = async (flatId, content) => {
  const message = new Message({ flatId, ...content });
  return await message.save();
};
export { getAllMessages, getUserMessages, addMessage };
