import { create } from 'zustand';
import instance, { clearAuthHeader, setAuthHeader } from '@/utils/axiosInterceptor';
import { setAccessTokenCookie, clearAccessTokenCookie, getAccessTokenFromCookie } from '@/utils/tokenCookie';
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
  fetchMe: () => Promise<IUser | null>;
  updateMe: (data: { name?: string; lastName?: string; age?: number }) => Promise<IUser>;
  hydrateFromCookie: () => Promise<boolean>;
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

  fetchMe: async () => {
    try {
      const { data } = await instance.get('/api/contacts/me');
      const user = data.data as IUser;
      set({ user, isLoggedIn: true, loading: false, error: null });
      return user;
    } catch {
      return null;
    }
  },

  updateMe: async (payload) => {
    const { data } = await instance.patch('/api/contacts/me', payload);
    const user = data.data as IUser;
    set({ user });
    return user;
  },

  hydrateFromCookie: async (): Promise<boolean> => {
    const token = getAccessTokenFromCookie();
    if (!token) return false;
    setAuthHeader(token);
    const fetch = get().fetchMe;
    const me = await fetch();
    return !!me;
  },

  sendLoginCode: async (email: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await instance.post('/api/user/send-code', { email });
      set({ loading: false });
      return data.data as { previewUrl: string | null };
    } catch (e: unknown) {
      const message = extractErrorMessage(e);
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  verifyLoginCode: async (email: string, code: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await instance.post('/api/user/verify-code', { email, code });
      const payload = data.data as IAuthResponse;
      get().setSession(payload);
      return payload;
    } catch (e: unknown) {
      const message = extractErrorMessage(e);
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  logout: async () => {
    await instance.post('/api/user/logout').catch(() => undefined);
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
    } catch {
      return null;
    }
  },
}));


function extractErrorMessage(e: unknown): string {
  if (typeof e === 'object' && e !== null) {
    const maybeResponse = (e as { response?: { data?: { message?: string } } }).response;
    const message = maybeResponse?.data?.message;
    if (typeof message === 'string' && message.length > 0) return message;
  }
  return 'Помилка';
}


