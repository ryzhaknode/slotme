import type { IUser } from './authTypes';

export interface IContacts {
  users: IUser[];
}

export interface IContactsState {
  users: IUser[];
  loading: boolean;
  error: boolean | null;
}

export interface IContactsResponse {
  data: IUser[];
}
