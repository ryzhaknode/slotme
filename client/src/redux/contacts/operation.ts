import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../utils/axiosInterceptor';
import { handleError } from '../helpers';

import type { IErrorResponse } from '../../types/authTypes';
import type { IContactsResponse } from '../../types/contactsTypes';

export const fetchAllUsers = createAsyncThunk<IContactsResponse, void, { rejectValue: IErrorResponse }>(
  'contacts/fetchAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/contacts');

      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  },
);
