import { getIo } from '../../socket/index.js';
import { deleteMessage, sendMessage, updateMessage } from '../services/message.js';
import { env } from '../utils/env.js';

const BASE_URL = env('BASE_URL', 'http://localhost:3000');

export const sendMessageController = async (req, res) => {
  const senderId = req.user.id;
  const chatId = req.params.chatId;

  const { text } = req.body;

  const files = (req.files || []).map((file) => ({
    url: `${BASE_URL}/uploads/${file.filename}`,
  }));

  const message = await sendMessage(senderId, chatId, { text, files });

  // Надсилаємо повідомлення всім учасникам чату
  const io = getIo();
  io.to(chatId).emit('receiveMessage', message);

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

  const io = getIo();
  io.to(message.chatId).emit('updateMessage', message);

  res.status(200).json({
    status: 200,
    message: 'Message updated successfully!',
    data: message,
  });
};

export const deleteMessageController = async (req, res) => {
  const userId = req.user.id;
  const chatId = req.params.chatId;
  const messageId = req.params.messageId;

  await deleteMessage(userId, messageId);

  const io = getIo();
  io.to(chatId).emit('deleteMessage', { id: messageId });

  res.status(200).json({
    status: 200,
    message: 'Message deleted successfully!',
    data: { id: messageId },
  });
};
