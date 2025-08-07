import { createSlice } from '@reduxjs/toolkit';
import type { IAuthState } from '../../types/authTypes';

const handlePending = (state) => {
  state.loading = true;
  state.authProcess = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
  state.authProcess = false;
};

const initialState: IAuthState = {
  user: {
    name: null,
    email: null,
  },
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
  authProcess: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
    finishAuthProcess(state) {
      state.authProcess = false;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setTokens, clearTokens, finishAuthProcess } = authSlice.actions;
export const authReducer = authSlice.reducer;
