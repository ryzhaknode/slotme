export interface IChat {
  id: string | null;
  otherUserId: string | null;
}

export interface IChatState {
  chat: IChat;
  loading: boolean;
  error: boolean | null;
}

export interface IChatResponse {
  data: IChat;
}

export interface ICreateChatValue {
  otherUserId: string | null;
}
