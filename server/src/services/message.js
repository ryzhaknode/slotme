import createHttpError from 'http-errors';
import prisma from '../../prisma/prisma.js';
import { messageInclude } from '../../prisma/includes/messageInclude.js';

export const sendMessage = async (senderId, chatId, { text, files }) => {
  return await prisma.message.create({
    data: {
      text: text || null,
      chatId,
      senderId,
      files: {
        create: files?.map((f) => ({ url: f.url })),
      },
    },
    include: messageInclude,
  });
};

export const updateMessage = async (userId, messageId, { text, files }) => {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
    include: { files: true },
  });

  if (!message || message.senderId !== userId) {
    throw createHttpError(403, 'Forbidden');
  }

  if (!Array.isArray(files) || files.length === 0) {
    return await prisma.message.update({
      where: { id: messageId },
      data: { text: text || null },
      include: { files: true },
    });
  }

  await prisma.file.deleteMany({
    where: { messageId },
  });

  return await prisma.message.update({
    where: { id: messageId },
    data: {
      text: text || null,
      files: {
        create: files.map((f) => ({ url: f.url })),
      },
    },
    include: { files: true },
  });
};

export const deleteMessage = async (userId, messageId) => {
  const message = await prisma.message.findUnique({ where: { id: messageId } });

  if (!message || message.senderId !== userId) {
    throw createHttpError(403, 'Forbidden');
  }

  await prisma.message.delete({ where: { id: messageId } });
};
