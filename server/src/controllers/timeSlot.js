import { getBookingByDateAndTime, createBooking as createBookingSvc, findBookingById, deleteBooking } from '../services/timeSlot.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// Получение слотов по дате
export const getTimeSlotsByDate = async (req, res) => {
  const { date } = req.params;
  
  // Генерируем слоты с 11:00 до 21:00
  const slots = [];
  for (let hour = 11; hour < 21; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    
    // Проверяем, есть ли бронирование для этого слота
    const booking = await getBookingByDateAndTime(date, startTime, endTime);
    
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
  const startTime = parts.slice(3).join('-');
  const endTime = `${(parseInt(startTime.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;
  
  const existingBooking = await getBookingByDateAndTime(date, startTime, endTime);
  
  if (existingBooking) {
    return res.status(400).json({
      status: 'error',
      message: 'Слот уже занят',
    });
  }
  
  // Создаем бронирование
  const booking = await createBookingSvc(date, startTime, endTime, serviceId, userId);
  
  res.json({
    status: 'success',
    message: 'Бронирование создано успешно',
    data: booking,
  });
};

// Отмена бронирования
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  
  const booking = await findBookingById(bookingId);
  
  if (!booking) {
    return res.status(404).json({
      status: 'error',
      message: 'Бронирование не найдено',
    });
  }
  
  await deleteBooking(bookingId);
  
  res.json({
    status: 'success',
    message: 'Бронирование отменено',
  });
};

export const getTimeSlotsByDateHandler = ctrlWrapper(getTimeSlotsByDate);
export const createBookingHandler = ctrlWrapper(createBooking);
export const cancelBookingHandler = ctrlWrapper(cancelBooking);
