import { createSlice } from '@reduxjs/toolkit';
import { fetchMessagesByChatId } from './operation';
import { resetAppState } from '../actions/globalActions';
import type { IMessagesState } from '../../types/messageTypes';

const handlePending = (state: IMessagesState) => {
  state.loading = true;
};

const handleRejected = (state: IMessagesState) => {
  state.loading = false;
  state.error = true;
};

const initialState: IMessagesState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByChatId.pending, handlePending)
      .addCase(fetchMessagesByChatId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.messages = action.payload.data;
      })
      .addCase(fetchMessagesByChatId.rejected, handleRejected)

      .addCase(resetAppState, () => initialState);
  },
});

export const messageReducer = messageSlice.reducer;
