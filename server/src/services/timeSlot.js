import prisma from '../../prisma/prisma.js';

const toLocalDate = (dateString) => {
  // dateString expected as YYYY-MM-DD; construct local date to avoid UTC shift
  const [y, m, d] = String(dateString).split('-').map((v) => parseInt(v, 10));
  if (!y || !m || !d) return new Date(dateString);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
};

export const getBookingByDateAndTime = async (date, startTime, endTime) => {
  return await prisma.booking.findFirst({
    where: {
      date: toLocalDate(date),
      startTime,
      endTime,
    },
    include: {
      service: true,
      user: true,
    },
  })
}

export const createBooking = async (date, startTime, endTime, serviceId, userId) => {
  return await prisma.booking.create({
    data: {
      date: toLocalDate(date),
      startTime,
      endTime,
      serviceId,
      userId,
    },
    include: {
      service: true,
      user: true,
    },
  });
}

export const findBookingById = async (bookingId) => {
  return await prisma.booking.findUnique({
    where: { id: bookingId },
  });
}

export const deleteBooking = async (bookingId) => {
  return await prisma.booking.delete({
    where: { id: bookingId },
  });
}

export const findBookingsByUserId = async (userId) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: { service: true },
    orderBy: [
      { date: 'asc' },
      { startTime: 'asc' },
    ],
  });
}