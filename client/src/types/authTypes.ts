export interface IUser {
  name: string | null;
  email: string | null;
}

export interface IAuthState {
  user: IUser;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  loading: boolean;
  error: boolean | null;
  authProcess: boolean;
}

export interface IAuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  data: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IErrorResponse {
  message: string;
}
