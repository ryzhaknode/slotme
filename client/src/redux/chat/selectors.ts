import type { RootState } from '../store';

export const selectChat = (state: RootState) => state.chat.chat;
