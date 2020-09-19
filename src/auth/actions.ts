import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { action } from 'typesafe-actions';

import { AuthActionTypes } from './models';

export const initiateCreateUser = (cellphone: string) =>
  action(AuthActionTypes.INITIATE_CREATE_USER, {
    cellphone,
  });

export const initiateCreateUserSuccess = (
  confirmationResult: FirebaseAuthTypes.ConfirmationResult,
) =>
  action(AuthActionTypes.INITIATE_CREATE_USER_SUCCESS, {
    confirmationResult,
  });

export const verifyPinCode = (
  pinCode: string,
  email: string,
  password: string,
) => action(AuthActionTypes.VERIFY_PIN_CODE, { pinCode, email, password });

export const verifyPinCodeSuccess = (user: FirebaseAuthTypes.User) =>
  action(AuthActionTypes.VERIFY_PIN_CODE_SUCCESS, {
    user,
  });

export const signInError = () => action(AuthActionTypes.SIGN_IN_ERROR);

export const signOut = () => action(AuthActionTypes.SIGN_OUT);

export const signOutSuccess = () => action(AuthActionTypes.SIGN_OUT_SUCCESS);

export const signOutError = () => action(AuthActionTypes.SIGN_OUT_ERROR);
