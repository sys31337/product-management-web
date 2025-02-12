export interface LoggedUser extends Payload {
  fullname?: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  role: 'CLIENT' | 'MANAGER' | 'ADMIN';
}

export interface User {
  fullname?: string;
  avatar?: string;
  email: string;
  password: string;
  salt: string;
  role: 'CLIENT' | 'MANAGER' | 'ADMIN';
  resetPasswordUid: string;
  resetPasswordExpiresAt: Date;
  __v: number;
}

export type AuthState = {
  user: User | null;
  loading: boolean;
}
interface Payload { [key: string]: string | number | boolean | null | Payload }

export type AuthPayload = {
  type: string;
  payload?: Payload
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  dispatch: React.Dispatch<AuthPayload>;
}
