import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface ITimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
  isAvailable: boolean;
  serviceId?: string;
  userId?: string;
}

export interface ITimeSlotStatus {
  slotId: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  serviceName?: string;
  userName?: string;
}

export interface IBookingRequest {
  slotId: string;
  serviceId: string;
  userId: string;
  date: string;
}

export interface IBookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
}

// Получение статусов слотов по дате
export const fetchTimeSlotsByDate = async (date: string): Promise<ITimeSlotStatus[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/time-slots/${date}`);
    return response.data.data;
  } catch (error: any) {
    // Если сервер недоступен, возвращаем mock данные
    if (error.code === 'ERR_CONNECTION_REFUSED' || error.code === 'ERR_NETWORK') {
      console.warn('Server is not available, using mock time slots');
      return generateMockTimeSlots(date);
    }
    throw error;
  }
};

// Бронирование слота
export const bookTimeSlot = async (bookingData: IBookingRequest): Promise<IBookingResponse> => {
  const response = await axios.post(`${API_BASE_URL}/time-slots/bookings`, bookingData);
  return response.data;
};

// Отмена бронирования
export const cancelBooking = async (bookingId: string): Promise<IBookingResponse> => {
  const response = await axios.delete(`${API_BASE_URL}/time-slots/bookings/${bookingId}`);
  return response.data;
};

// Генерация mock данных для слотов (11:00 - 21:00)
const generateMockTimeSlots = (date: string): ITimeSlotStatus[] => {
  const slots: ITimeSlotStatus[] = [];
  const startHour = 11;
  const endHour = 21;
  
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    
    // Случайно делаем некоторые слоты занятыми (30% вероятность)
    const isAvailable = Math.random() > 0.3;
    
    slots.push({
      slotId: `${date}-${startTime}`,
      startTime,
      endTime,
      isAvailable,
      serviceName: !isAvailable ? 'Занято' : undefined,
      userName: !isAvailable ? 'Клієнт' : undefined,
    });
  }
  
  return slots;
};
