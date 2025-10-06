import prisma from '../../prisma/prisma.js';

export const getBookingByDateAndTime = async (date, startTime, endTime) => {
  return await prisma.booking.findFirst({
    where: {
      date: new Date(date),
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
      date: new Date(date),
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