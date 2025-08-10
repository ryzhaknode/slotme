import { createChat, getUserChats } from '../services/chat.js';

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

export const getUserChatsController = async (req, res) => {
  const currentUserId = req.user.id;

  const chats = await getUserChats(currentUserId);

  res.status(200).json({
    status: 200,
    message: 'Chats fetched successfully',
    data: chats,
  });
};
