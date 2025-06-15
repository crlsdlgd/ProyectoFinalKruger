import { Message } from "../models/message.model.js";

const getMessagesByFlat = async (query) => {
  return await Message.find(query).populate("senderId", "firstname lastname email");
};
const getMessagesByFlatAndSender = async (flatId, senderId) => {
  return await Message.find({ flatId, senderId, deletedAt: null });
};
const addMessage = async (flatId, content, senderId) => {
  const message = new Message({ flatId, ...content, senderId });
  return await message.save();
};
export { getMessagesByFlat, getMessagesByFlatAndSender, addMessage };
