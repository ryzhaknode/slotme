import { createChat, getMessages } from '../services/chat.js';

export const createChatController = async (req, res) => {
  const currentUserId = req.user.id;
  const otherUserId = req.body.otherUserId;

  const chat = await createChat(currentUserId, otherUserId);
  const { id, userOneId, userTwoId } = chat;

  const actualOtherUserId = userOneId === currentUserId ? userTwoId : userOneId;

  const data = {
    id,
    otherUserId: actualOtherUserId,
  };

  res.status(201).json({
    status: 201,
    message: 'Chat created or found successfully!',
    data,
  });
};

export const getMessagesController = async (req, res) => {
  const chatId = req.params.chatId;

  const messages = await getMessages(chatId);

  res.status(200).json({
    status: 200,
    message: 'Messages fetched successfully!',
    data: messages,
  });
};
