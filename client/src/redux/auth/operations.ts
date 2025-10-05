import { createAsyncThunk } from '@reduxjs/toolkit';
import instance, { clearAuthHeader, setAuthHeader } from '../../utils/axiosInterceptor';
import { handleError } from '../helpers';
import { setTokens } from './slice';
import type { IAuthFormValues, IAuthResponse, IErrorResponse } from '../../types/authTypes';
import type { RootState } from '../store';

export const register = createAsyncThunk<IAuthResponse, IAuthFormValues, { rejectValue: IErrorResponse }>(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await instance.post('/user/register', newUser);
      setAuthHeader(response.data.data.accessToken);

      return response.data.data;
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);

export const logIn = createAsyncThunk<IAuthResponse, IAuthFormValues, { rejectValue: IErrorResponse }>(
  'auth/login',
  async (userInfo, thunkAPI) => {
    try {
      const response = await instance.post('/user/login', userInfo);
      setAuthHeader(response.data.data.accessToken);

      return response.data.data;
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);

export const logOut = createAsyncThunk<void, void, { rejectValue: IErrorResponse }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await instance.post('/user/logout');
      clearAuthHeader();
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);

export const refreshUser = createAsyncThunk<IAuthResponse, void, { state: RootState; rejectValue: IErrorResponse }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const savedRefreshToken = reduxState.auth.refreshToken;

    if (!savedRefreshToken) {
      return thunkAPI.rejectWithValue({ message: 'No refresh token available' });
    }

    try {
      const response = await instance.post('/user/refresh', {
        refreshToken: savedRefreshToken,
      });

      const { accessToken, refreshToken } = response.data.data;

      thunkAPI.dispatch(setTokens({ accessToken, refreshToken }));
      setAuthHeader(accessToken);

      return response.data.data;
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);
