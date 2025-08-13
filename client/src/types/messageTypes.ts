export interface IFile {
  id: string;
  url: string;
}

export interface IMessage {
  id: string;
  text?: string | null;
  senderId: string;
  chatId: string;
  files: IFile[];
  createdAt: string;
  updatedAt: string;
}

export interface IMessagesState {
  messages: IMessage[];
  loading: boolean;
  error: boolean | null;
}

export interface IMessagesResponse {
  data: IMessage[] | [];
}

export interface ICreateMessagePayload {
  chatId: string;
  formData: FormData;
}

export interface ICreateMessagesResponse {
  data: IMessage;
}

export interface IEditeMessagePayload {
  messageId: string;
  formData: FormData;
}

export interface IDeleteMessagePayload {
  messageId: string;
  chatId: string | null;
}
