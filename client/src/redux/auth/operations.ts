import { createAsyncThunk } from '@reduxjs/toolkit';
import instance, { clearAuthHeader, setAuthHeader } from '../../utils/axiosInterceptor';
import { handleError } from '../helpers';
import { setTokens } from './slice';
import type { IUser } from '../../types/authTypes';
import type { RootState } from '../store';

interface IRefreshUserResponse {
  accessToken: string;
  user: IUser;
}

export const register = createAsyncThunk('auth/register', async (newUser, thunkAPI) => {
  try {
    const response = await instance.post('/auth/register', newUser);

    setAuthHeader(response.data.data.accessToken);

    return response.data.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const logIn = createAsyncThunk('auth/login', async (userInfo, thunkAPI) => {
  try {
    const response = await instance.post('/users/login', userInfo);
    setAuthHeader(response.data.token);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const refreshUser = createAsyncThunk<IRefreshUserResponse, void, { state: RootState; rejectValue: string }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const savedRefreshToken = reduxState.auth.refreshToken;

    if (!savedRefreshToken) {
      return thunkAPI.rejectWithValue('No refresh token available');
    }

    try {
      const response = await instance.post('/auth/refresh', {
        refreshToken: savedRefreshToken,
      });

      const { accessToken, refreshToken } = response.data.data;

      thunkAPI.dispatch(setTokens({ accessToken, refreshToken }));
      setAuthHeader(accessToken);

      const userResponse = await instance.get('/auth/user-info');

      return {
        accessToken, // додаємо до відповіді accessToken який потрібен інтерцептору для повторного виклику запиту що визвав рефреш!
        user: userResponse.data,
      };
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const savedRefreshToken = reduxState.auth.refreshToken;
      return savedRefreshToken !== null;
    },
  },
);
