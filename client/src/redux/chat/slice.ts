import { createSlice } from '@reduxjs/toolkit';
import { createChat } from './operation';
import type { IChatState } from '../../types/chatTypes';

const handlePending = (state: IChatState) => {
  state.loading = true;
};

const handleRejected = (state: IChatState) => {
  state.loading = false;
  state.error = true;
};

const initialState: IChatState = {
  chat: {
    id: null,
    otherUserId: null,
  },
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, handlePending)
      .addCase(createChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chat = action.payload.data;
      })
      .addCase(createChat.rejected, handleRejected);
  },
});

export const chatReducer = chatSlice.reducer;
