import type { RootState } from '../store';

export const selectLoading = (state: RootState) => state.auth.loading;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectAuthProcess = (state: RootState) => state.auth.authProcess;

export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
