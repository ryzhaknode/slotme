import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers } from './operation';

import type { IContactsState } from '../../types/contactsTypes';

const handlePending = (state: IContactsState) => {
  state.loading = true;
};

const handleRejected = (state: IContactsState) => {
  state.loading = false;
  state.error = true;
};

const initialState: IContactsState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, handlePending)
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.data;
      })
      .addCase(fetchAllUsers.rejected, handleRejected);
  },
});

export const usersReducer = usersSlice.reducer;
