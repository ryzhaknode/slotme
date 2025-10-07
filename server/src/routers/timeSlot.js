import { Router } from 'express';
import { getTimeSlotsByDateHandler, createBookingHandler, cancelBookingHandler, getMyBookingsHandler } from '../controllers/timeSlot.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { bookingValidation } from '../validation/booking.js';

const router = Router();

// Получение слотов по дате
router.get('/:date', getTimeSlotsByDateHandler);

// Создание бронирования (временно без аутентификации для тестирования)
router.post('/bookings', validateBody(bookingValidation), createBookingHandler);

// Отмена бронирования
router.delete('/bookings/:bookingId', authenticate, cancelBookingHandler);

// Мои бронирования
router.get('/bookings/me', authenticate, getMyBookingsHandler);

export default router;
