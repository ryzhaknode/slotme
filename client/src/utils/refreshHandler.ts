import type { Store } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';

let store: Store<RootState> | null = null;

export const setStore = (reduxStore: Store<RootState>): void => {
  store = reduxStore;
};

export const getStore = (): Store<RootState> | null => store;

export const getStoreOrThrow = (): Store<RootState> => {
  if (!store) {
    throw new Error('Store has not been initialized. Call setStore() first.');
  }
  return store;
};
