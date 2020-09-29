import { action } from 'typesafe-actions';

import { UserActionTypes, UserData } from './models';

export const saveUser = (userData: UserData) =>
  action(UserActionTypes.SAVE_USER, {
    userData,
  });

export const saveUserSuccess = () => action(UserActionTypes.SAVE_USER_SUCCESS);

export const saveUserError = () => action(UserActionTypes.SAVE_USER_ERROR);
