import {
  getAllMessages as getAllMessagesRepository,
  getUserMessages as getUserMessagesRepository,
  addMessage as addMessageRepository,
} from "../repository/message.repository.js";

const getAllMessages = async (flatId) => {
  return await getAllMessagesRepository(flatId);
};

const getUserMessages = async (flatId, senderId) => {
  return await getUserMessagesRepository(flatId, senderId);
};

const addMessage = async (flatId, content, senderId) => {
  return await addMessageRepository(flatId, content, senderId);
};
export { getAllMessages, getUserMessages, addMessage };
