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
