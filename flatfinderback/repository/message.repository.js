import { Message } from "../models/message.model.js";

const getAllMessages = async (flatId) => {
  return await Message.find({ flatId, deletedAt: null });
};
const getUserMessages = async (flatId, senderId) => {
  return await Message.find({ flatId, senderId, deletedAt: null });
};
const addMessage = async (flatId, content, senderId) => {
  const message = new Message({ flatId, ...content, senderId });
  return await message.save();
};
export { getAllMessages, getUserMessages, addMessage };
