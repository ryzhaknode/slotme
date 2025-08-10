import createHttpError from 'http-errors';
import prisma from '../../prisma/prisma.js';

export const createChat = async (currentUserId, otherUserId) => {
  if (otherUserId === currentUserId) {
    throw createHttpError(400, 'You cannot create a chat with yourself');
  }

  // Нормалізація: завжди менший UUID перший
  const [userOneId, userTwoId] =
    currentUserId < otherUserId ? [currentUserId, otherUserId] : [otherUserId, currentUserId];

  let chat = await prisma.chat.findFirst({
    where: {
      userOneId,
      userTwoId,
    },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: { userOneId, userTwoId },
    });
  }

  return chat;
};

export const getUserChats = async (currentUserId) => {
  return prisma.chat.findMany({
    where: {
      OR: [{ userOneId: currentUserId }, { userTwoId: currentUserId }],
    },
    include: {
      user1: { select: { id: true, name: true, email: true } },
      user2: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};
