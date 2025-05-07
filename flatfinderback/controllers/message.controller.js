import {
  getMessagesByFlat as getMessagesByFlatService,
  getMessagesByFlatAndSender as getMessagesByFlatAndSenderService,
  addMessage as addMessageService,
} from "../services/message.service.js";

const getMessagesByFlat = async (req, res) => {
  try {
    const messages = await getMessagesByFlatService(req.params.flatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMessagesByFlatAndSender = async (req, res) => {
  try {
    const messages = await getMessagesByFlatAndSenderService(
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
    const message = await addMessageService(req.params.flatId, req.body, req.user.id);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getMessagesByFlat, getMessagesByFlatAndSender, addMessage };
