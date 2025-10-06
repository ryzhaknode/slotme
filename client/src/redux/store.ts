import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../utils/refreshHandler';
import { authReducer } from './auth/slice';
import { usersReducer } from './contacts/slice';
import { chatReducer } from './chat/slice';
import { messageReducer } from './message/slice';

import type { PersistConfig } from 'redux-persist';
import type { TypedUseSelectorHook } from 'react-redux';
import type { IAuthState } from '../types/authTypes';
import type { IChatState } from '../types/chatTypes';
import type { IMessagesState } from '../types/messageTypes';

const authPersistConfig: PersistConfig<IAuthState> = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

const chatPersistConfig: PersistConfig<IChatState> = {
  key: 'chat',
  storage,
  whitelist: ['chat'],
};

const messagePersistConfig: PersistConfig<IMessagesState> = {
  key: 'messages',
  storage,
  whitelist: ['messages'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);
const persistedMessageReducer = persistReducer(messagePersistConfig, messageReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: usersReducer,
    chat: persistedChatReducer,
    message: persistedMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

setStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
