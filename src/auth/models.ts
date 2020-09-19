import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthActionTypes {
  CREATE_USER_WITH_EMAIL_AND_PASSWORD = '@@auth/CREATE_USER_WITH_EMAIL_AND_PASSWORD',
  CREATE_USER_WITH_EMAIL_AND_PASSWORD_SUCCESS = '@@auth/CREATE_USER_WITH_EMAIL_AND_PASSWORD_SUCCESS',
  SIGN_IN_ERROR = '@@auth/SIGN_IN_ERROR',
  SIGN_OUT = '@@auth/SIGN_OUT',
  SIGN_OUT_SUCCESS = '@@auth/SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR = '@@auth/SIGN_OUT_ERROR',
}

export interface AuthState extends FirebaseAuthTypes.User {
  loading: boolean;
}
