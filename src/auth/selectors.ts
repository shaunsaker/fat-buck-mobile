import { ApplicationState } from '../store/reducers';

export const selectIsAuthenticated = (state: ApplicationState) =>
  Boolean(
    state.auth.uid && state.auth.email && state.auth.phoneNumber, // TODO: test this
  );

export const selectIsAuthLoading = (state: ApplicationState) =>
  state.auth.loading;

export const selectAuthConfirmationResult = (state: ApplicationState) =>
  state.auth.confirmationResult;

export const selectIsNewUser = (state: ApplicationState) =>
  state.auth.isNewUser;
