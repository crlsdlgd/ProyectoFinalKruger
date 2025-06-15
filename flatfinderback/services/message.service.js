import {
  getMessagesByFlat as getMessagesByFlatRepository,
  getMessagesByFlatAndSender as getMessagesByFlatAndSenderRepository,
  addMessage as addMessageRepository,
} from "../repository/message.repository.js";

import { getFlatById } from "../repository/flat.repository.js";

const getMessagesByFlat = async (flatId, senderId) => {
  const flat = await getFlatById(flatId);
  let query = "";
  if (flat.ownerId == senderId) {
    query = { flatId, deletedAt: null };
  } else {
    query = { flatId, senderId, deletedAt: null };
  }
  return await getMessagesByFlatRepository(query);
};

const getMessagesByFlatAndSender = async (flatId, senderId) => {
  return await getMessagesByFlatAndSenderRepository(flatId, senderId);
};

const addMessage = async (flatId, content, senderId) => {
  return await addMessageRepository(flatId, content, senderId);
};
export { getMessagesByFlat, getMessagesByFlatAndSender, addMessage };
