import { useQuery } from '@tanstack/react-query';
import { fetchServices, fetchServiceById, type IService } from '../api/services';

// Ключи для кеширования
export const servicesKeys = {
  all: ['services'] as const,
  lists: () => [...servicesKeys.all, 'list'] as const,
  list: (filters: string) => [...servicesKeys.lists(), { filters }] as const,
  details: () => [...servicesKeys.all, 'detail'] as const,
  detail: (id: string) => [...servicesKeys.details(), id] as const,
};

// Хук для получения всех услуг
export const useServices = () => {
  return useQuery({
    queryKey: servicesKeys.lists(),
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут
    retry: (failureCount, error: any) => {
      // Не повторяем запросы при ошибках подключения
      if (error?.code === 'ERR_CONNECTION_REFUSED' || error?.code === 'ERR_NETWORK') {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Хук для получения услуги по ID
export const useService = (id: string) => {
  return useQuery({
    queryKey: servicesKeys.detail(id),
    queryFn: () => fetchServiceById(id),
    enabled: !!id, // Запрос выполняется только если id существует
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
