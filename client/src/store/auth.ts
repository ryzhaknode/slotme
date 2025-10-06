import { create } from 'zustand';
import instance, { clearAuthHeader, setAuthHeader } from '@/utils/axiosInterceptor';
import { setAccessTokenCookie, clearAccessTokenCookie } from '@/utils/tokenCookie';
import type { IAuthResponse, IUser } from '@/types/authTypes';

type AuthState = {
  user: IUser;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  sendLoginCode: (email: string) => Promise<{ previewUrl: string | null }>;
  verifyLoginCode: (email: string, code: string) => Promise<IAuthResponse>;
  logout: () => Promise<void>;
  refresh: () => Promise<IAuthResponse | null>;
  setSession: (payload: IAuthResponse) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: { id: null, name: null, email: null },
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  loading: false,
  error: null,

  setSession: (payload) => {
    set({
      user: payload.data,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      isLoggedIn: true,
      loading: false,
      error: null,
    });
    setAuthHeader(payload.accessToken);
    setAccessTokenCookie(payload.accessToken);
  },

  sendLoginCode: async (email: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await instance.post('/api/user/send-code', { email });
      set({ loading: false });
      return data.data as { previewUrl: string | null };
    } catch (e: any) {
      set({ loading: false, error: e?.response?.data?.message || 'Помилка' });
      throw new Error(e?.response?.data?.message || 'Помилка');
    }
  },

  verifyLoginCode: async (email: string, code: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await instance.post('/api/user/verify-code', { email, code });
      const payload = data.data as IAuthResponse;
      get().setSession(payload);
      return payload;
    } catch (e: any) {
      set({ loading: false, error: e?.response?.data?.message || 'Помилка' });
      throw new Error(e?.response?.data?.message || 'Помилка');
    }
  },

  logout: async () => {
    try {
      await instance.post('/api/user/logout');
    } catch (_) {}
    clearAuthHeader();
    clearAccessTokenCookie();
    set({
      user: { id: null, name: null, email: null },
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
    });
  },

  refresh: async () => {
    const refreshToken = get().refreshToken;
    if (!refreshToken) return null;
    try {
      const { data } = await instance.post('/api/user/refresh', { refreshToken });
      const payload = data.data as IAuthResponse;
      get().setSession(payload);
      return payload;
    } catch (_) {
      return null;
    }
  },
}));


