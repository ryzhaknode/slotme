import { deleteMessage, sendMessage, updateMessage } from '../services/message.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export const sendMessageController = async (req, res) => {
  const senderId = req.user.id;
  const chatId = req.params.chatId;

  const { text } = req.body;

  const files = (req.files || []).map((file) => ({
    url: `${BASE_URL}/uploads/${file.filename}`,
  }));

  const message = await sendMessage(senderId, chatId, { text, files });

  res.status(201).json({
    status: 201,
    message: 'Message sent successfully!',
    data: message,
  });
};

export const updateMessageController = async (req, res) => {
  const userId = req.user.id;
  const messageId = req.params.id;

  const { text } = req.body;

  const files = (req.files || []).map((file) => ({
    url: `${BASE_URL}/uploads/${file.filename}`,
  }));

  const message = await updateMessage(userId, messageId, { text, files });

  res.status(200).json({
    status: 200,
    message: 'Message updated successfully!',
    data: message,
  });
};

export const deleteMessageController = async (req, res) => {
  const userId = req.user.id;
  const messageId = req.params.id;

  await deleteMessage(userId, messageId);

  res.status(200).json({
    status: 200,
    message: 'Message deleted successfully!',
  });
};
