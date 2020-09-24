export enum UserActionTypes {
  SAVE_USER = '@@user/SAVE_USER',
  SAVE_USER_SUCCESS = '@@user/SAVE_USER_SUCCESS',
  SAVE_USER_ERROR = '@@user/SAVE_USER_ERROR',
}

export interface User {
  uid: string | null;
  email: string | null;
  cellphone: string | null;
  country: string;
  dateLastSignedIn: string;
}

export interface UserState extends User {
  loading: boolean;
}
