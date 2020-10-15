export enum UserActionTypes {
  SAVE_USER = '@@user/SAVE_USER',
  SAVE_USER_SUCCESS = '@@user/SAVE_USER_SUCCESS',
  SAVE_USER_ERROR = '@@user/SAVE_USER_ERROR',
}

export interface UserData {
  uid: string;
  email: string;
  cellphone: string;
  country: string;
  dateLastSignedIn: string;
}

export interface UserState extends UserData {
  loading: boolean;
}
