import instance from '../../utils/axiosInterceptor.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from '../helpers.js';

import type { IErrorResponse } from '../../types/authTypes.js';
import type {
  ICreateMessagePayload,
  ICreateMessagesResponse,
  IDeleteMessagePayload,
  IEditeMessagePayload,
  IMessagesResponse,
} from '../../types/messageTypes.js';

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
>('message/createMessage', async ({ chatId, formData }, thunkAPI) => {
  try {
    const response = await instance.post(`/message/create/${chatId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const deleteMessage = createAsyncThunk<void, IDeleteMessagePayload, { rejectValue: IErrorResponse }>(
  'message/deleteMessage',
  async (messageData, thunkAPI) => {
    const { messageId, chatId } = messageData;
    try {
      await instance.delete(`/message/delete/${messageId}/chat/${chatId}`);
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);

export const editeMessage = createAsyncThunk<
  ICreateMessagesResponse,
  IEditeMessagePayload,
  { rejectValue: IErrorResponse }
>('message/editeMessage', async ({ messageId, formData }, thunkAPI) => {
  try {
    const response = await instance.put(`/message/update/${messageId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
