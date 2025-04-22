import {
  getAllMessages as getAllMessagesService,
  getUserMessages as getUserMessagesService,
  addMessage as addMessageService,
} from "../services/message.service.js";

const getAllMessages = async (req, res) => {
  try {
    const messages = await getAllMessagesService(req.params.flatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const messages = await getUserMessagesService(
      req.params.flatId,
      req.params.senderId
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const message = await addMessageService(req.params.flatId, req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getAllMessages, getUserMessages, addMessage };
