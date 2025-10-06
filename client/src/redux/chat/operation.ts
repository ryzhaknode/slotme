import instance from '../../utils/axiosInterceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers';
import type { IErrorResponse } from '../../types/authTypes';
import type { IChatResponse, ICreateChatValue } from '../../types/chatTypes';

export const createChat = createAsyncThunk<IChatResponse, ICreateChatValue, { rejectValue: IErrorResponse }>(
  'chat/createChat',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post('/chat/create', payload);

      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);
