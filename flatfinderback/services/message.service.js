import {
  getMessagesByFlat as getMessagesByFlatRepository,
  getMessagesByFlatAndSender as getMessagesByFlatAndSenderRepository,
  addMessage as addMessageRepository,
} from "../repository/message.repository.js";

const getMessagesByFlat = async (flatId) => {
  return await getMessagesByFlatRepository(flatId);
};

const getMessagesByFlatAndSender = async (flatId, senderId) => {
  return await getMessagesByFlatAndSenderRepository(flatId, senderId);
};

const addMessage = async (flatId, content, senderId) => {
  return await addMessageRepository(flatId, content, senderId);
};
export { getMessagesByFlat, getMessagesByFlatAndSender, addMessage };
