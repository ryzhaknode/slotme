import { PrismaClient } from '../generated/prisma/index.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const prisma = new PrismaClient();

// Получение слотов по дате
export const getTimeSlotsByDate = async (req, res) => {
  const { date } = req.params;
  
  // Генерируем слоты с 11:00 до 21:00
  const slots = [];
  for (let hour = 11; hour < 21; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    
    // Проверяем, есть ли бронирование для этого слота
    const booking = await prisma.booking.findFirst({
      where: {
        date: new Date(date),
        startTime,
        endTime,
      },
      include: {
        service: true,
        user: true,
      },
    });
    
    slots.push({
      slotId: `${date}-${startTime}`,
      startTime,
      endTime,
      isAvailable: !booking,
      serviceName: booking?.service?.name,
      userName: booking?.user?.name,
    });
  }
  
  res.json({
    status: 'success',
    data: slots,
  });
};

// Создание бронирования
export const createBooking = async (req, res) => {
  const { slotId, serviceId, userId, date } = req.body;
  
  // Проверяем, свободен ли слот
  const parts = slotId.split('-');
  const dateStr = parts.slice(0, 3).join('-');
  const startTime = parts.slice(3).join('-');
  const endTime = `${(parseInt(startTime.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;
  
  const existingBooking = await prisma.booking.findFirst({
    where: {
      date: new Date(date),
      startTime,
      endTime,
    },
  });
  
  if (existingBooking) {
    return res.status(400).json({
      status: 'error',
      message: 'Слот уже занят',
    });
  }
  
  // Создаем бронирование
  const booking = await prisma.booking.create({
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
  
  res.json({
    status: 'success',
    message: 'Бронирование создано успешно',
    data: booking,
  });
};

// Отмена бронирования
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  
  if (!booking) {
    return res.status(404).json({
      status: 'error',
      message: 'Бронирование не найдено',
    });
  }
  
  await prisma.booking.delete({
    where: { id: bookingId },
  });
  
  res.json({
    status: 'success',
    message: 'Бронирование отменено',
  });
};

export const getTimeSlotsByDateHandler = ctrlWrapper(getTimeSlotsByDate);
export const createBookingHandler = ctrlWrapper(createBooking);
export const cancelBookingHandler = ctrlWrapper(cancelBooking);
