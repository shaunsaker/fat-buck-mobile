import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { action } from 'typesafe-actions';

import { AuthActionTypes } from './models';

export const initiateSignIn = (cellphone: string) =>
  action(AuthActionTypes.INITIATE_SIGN_IN, {
    cellphone,
  });

export const initiateSignInSuccess = (
  confirmationResult: FirebaseAuthTypes.ConfirmationResult,
) =>
  action(AuthActionTypes.INITIATE_SIGN_IN_SUCCESS, {
    confirmationResult,
  });

export const signIn = (pinCode: string, email: string, password: string) =>
  action(AuthActionTypes.SIGN_IN, { pinCode, email, password });

export const signInSuccess = (user: Partial<FirebaseAuthTypes.User>) =>
  action(AuthActionTypes.SIGN_IN_SUCCESS, {
    user,
  });

export const signInError = () => action(AuthActionTypes.SIGN_IN_ERROR);

export const signOut = () => action(AuthActionTypes.SIGN_OUT);

export const signOutSuccess = () => action(AuthActionTypes.SIGN_OUT_SUCCESS);

export const signOutError = () => action(AuthActionTypes.SIGN_OUT_ERROR);

export const sendPasswordResetEmail = (email: string) =>
  action(AuthActionTypes.SEND_PASSWORD_RESET_EMAIL, { email });

export const sendPasswordResetEmailSuccess = () =>
  action(AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS);

export const sendPasswordResetEmailError = () =>
  action(AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_ERROR);
