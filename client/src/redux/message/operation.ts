import instance from '../../utils/axiosInterceptor.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';

import type { IErrorResponse } from '../../types/authTypes.js';
import type { ICreateMessagePayload, ICreateMessagesResponse, IMessagesResponse } from '../../types/messageTypes.js';

export const fetchMessagesByChatId = createAsyncThunk<
  IMessagesResponse,
  string | null,
  { rejectValue: IErrorResponse }
>('chat/fetchMessagesByChatId', async (chatId, thunkAPI) => {
  try {
    const response = await instance.get(`/chat/${chatId}/messages`);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const createMessage = createAsyncThunk<
  ICreateMessagesResponse,
  ICreateMessagePayload,
  { rejectValue: IErrorResponse }
>('message/fetchMessagesByChatId', async ({ chatId, ...newMessage }, thunkAPI) => {
  try {
    const response = await instance.post(`/message/create/${chatId}`, {
      ...newMessage,
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
