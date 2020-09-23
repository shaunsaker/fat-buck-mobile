import { action } from 'typesafe-actions';

import { UserActionTypes, User } from './models';

export const saveUser = (user: User) =>
  action(UserActionTypes.SAVE_USER, {
    user,
  });

export const saveUserSuccess = () => action(UserActionTypes.SAVE_USER_SUCCESS);

export const saveUserError = () => action(UserActionTypes.SAVE_USER_ERROR);
