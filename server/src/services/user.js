import prisma from '../../prisma/prisma.js';

export const getAllUsers = async (currentUserId) => {
  const users = prisma.user.findMany({
    where: {
      NOT: { id: currentUserId },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return users;
};

export const getCurrentUser = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, lastName: true, age: true, email: true },
  });
};

export const updateCurrentUser = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, name: true, lastName: true, age: true, email: true },
  });
};
