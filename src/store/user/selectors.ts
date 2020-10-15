import { ApplicationState } from '../reducers';

export const selectUserEmail = (state: ApplicationState) => state.user.email;

export const selectUserCellphone = (state: ApplicationState) =>
  state.user.cellphone;

export const selectUserUid = (state: ApplicationState) => state.user.uid;
