import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthActionTypes {
  INITIATE_CREATE_USER = '@@auth/INITIATE_CREATE_USER',
  INITIATE_CREATE_USER_SUCCESS = '@@auth/INITIATE_CREATE_USER_SUCCESS',
  VERIFY_PIN_CODE = '@@auth/VERIFY_PIN_CODE',
  VERIFY_PIN_CODE_SUCCESS = '@@auth/VERIFY_PIN_CODE_SUCCESS',
  SIGN_IN_ERROR = '@@auth/SIGN_IN_ERROR',
  SIGN_OUT = '@@auth/SIGN_OUT',
  SIGN_OUT_SUCCESS = '@@auth/SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR = '@@auth/SIGN_OUT_ERROR',
}

export interface AuthState extends FirebaseAuthTypes.User {
  loading: boolean;
  confirmationResult: FirebaseAuthTypes.ConfirmationResult;
  isNewUser: boolean;
}
