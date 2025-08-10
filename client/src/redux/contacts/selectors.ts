import type { RootState } from '../store';

export const selectUsers = (state: RootState) => state.contacts.users;
