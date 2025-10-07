import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTimeSlotsByDate, bookTimeSlot, cancelBooking, fetchMyBookings, type IBookingRequest, type IUserBookingItem } from '../api/timeSlots';

// Ключи для кеширования
export const timeSlotsKeys = {
  all: ['timeSlots'] as const,
  byDate: (date: string) => [...timeSlotsKeys.all, 'byDate', date] as const,
  bookings: () => [...timeSlotsKeys.all, 'bookings'] as const,
};

// Хук для получения слотов по дате
export const useTimeSlots = (date: string) => {
  return useQuery({
    queryKey: timeSlotsKeys.byDate(date),
    queryFn: () => fetchTimeSlotsByDate(date),
    enabled: !!date, // Запрос выполняется только если дата существует
    staleTime: 2 * 60 * 1000, // 2 минуты
    gcTime: 5 * 60 * 1000, // 5 минут
    retry: (failureCount, error: any) => {
      if (error?.code === 'ERR_CONNECTION_REFUSED' || error?.code === 'ERR_NETWORK') {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Хук для моих бронирований
export const useMyBookings = () => {
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: () => fetchMyBookings(),
    staleTime: 60 * 1000,
  });
};

// Хук для бронирования слота
export const useBookTimeSlot = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingData: IBookingRequest) => bookTimeSlot(bookingData),
    onSuccess: (data, variables) => {
      // Инвалидируем кеш для этой даты
      queryClient.invalidateQueries({
        queryKey: timeSlotsKeys.byDate(variables.date)
      });
      // Инвалидируем список моих записей
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      
      // Показываем уведомление об успехе
      console.log('Booking successful:', data.message);
    },
    onError: (error: any) => {
      console.error('Booking failed:', error.message);
    },
  });
};

// Хук для отмены бронирования
export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingId: string) => cancelBooking(bookingId),
    onSuccess: () => {
      // Инвалидируем все кеши слотов
      queryClient.invalidateQueries({
        queryKey: timeSlotsKeys.all
      });
      // Инвалидируем список моих записей
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    },
    onError: (error: any) => {
      console.error('Cancel booking failed:', error.message);
    },
  });
};
