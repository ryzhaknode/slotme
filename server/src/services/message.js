import createHttpError from 'http-errors';
import prisma from '../../prisma/prisma.js';

export const sendMessage = async (senderId, chatId, { text, files }) => {
  return await prisma.message.create({
    data: {
      text: text || null,
      chatId,
      senderId,
      files: {
        create: files?.map((f) => ({
          url: f.url,
        })),
      },
    },
    include: { files: true },
  });
};

export const updateMessage = async (userId, messageId, text) => {
  const message = await prisma.message.findUnique({ where: { id: messageId } });

  if (!message || message.senderId !== userId) {
    throw createHttpError(403, 'Forbidden');
  }

  return await prisma.message.update({
    where: { id: messageId },
    data: { text },
  });
};

export const deleteMessage = async (userId, messageId) => {
  const message = await prisma.message.findUnique({ where: { id: messageId } });

  if (!message || message.senderId !== userId) {
    throw createHttpError(403, 'Forbidden');
  }

  await prisma.message.delete({ where: { id: messageId } });
};
