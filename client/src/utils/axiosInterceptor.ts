import axios from 'axios';
import { getAccessTokenFromCookie } from './tokenCookie.ts';
import { useAuthStore } from '@/store/auth';

const instance = axios.create({
  baseURL: '',
  withCredentials: true,
});

export const setAuthHeader = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshed = await useAuthStore.getState().refresh();
        if (refreshed?.accessToken) {
          setAuthHeader(refreshed.accessToken);
          originalRequest.headers['Authorization'] = `Bearer ${refreshed.accessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// Attach token from cookie on each request if header not set
instance.interceptors.request.use((config) => {
  if (!config.headers['Authorization']) {
    const token = getAccessTokenFromCookie();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
