import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { action } from 'typesafe-actions';

import { AuthActionTypes } from './models';

export const createUserWithEmailAndPassword = (
  email: string,
  password: string,
) =>
  action(AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD, {
    email,
    password,
  });

export const createUserWithEmailAndPasswordSuccess = (
  user: FirebaseAuthTypes.User,
) =>
  action(AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD_SUCCESS, {
    user,
  });

export const signInError = () => action(AuthActionTypes.SIGN_IN_ERROR);

export const signOut = () => action(AuthActionTypes.SIGN_OUT);

export const signOutSuccess = () => action(AuthActionTypes.SIGN_OUT_SUCCESS);

export const signOutError = () => action(AuthActionTypes.SIGN_OUT_ERROR);
