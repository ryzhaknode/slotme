import axios from 'axios';

import { getStoreOrThrow } from './refreshHandler.ts';
import { clearTokens } from '../redux/auth/slice.ts';
import { refreshUser } from '../redux/auth/operations.ts';
import type { AppDispatch } from '../redux/store.ts';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
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

      const store = getStoreOrThrow();
      const dispatch = store.dispatch as AppDispatch;

      try {
        const { accessToken } = await dispatch(refreshUser()).unwrap();

        setAuthHeader(accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token', refreshError);
        dispatch(clearTokens());
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
