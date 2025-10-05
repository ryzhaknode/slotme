import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут (ранее cacheTime)
      retry: (failureCount, error: any) => {
        // Не повторяем запросы при ошибках подключения
        if (error?.code === 'ERR_CONNECTION_REFUSED' || error?.code === 'ERR_NETWORK') {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
