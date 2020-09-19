import { ApplicationState } from '../store/reducers';

export const selectIsAuthenticated = (state: ApplicationState) =>
  Boolean(
    state.auth.uid &&
      state.auth.email &&
      state.auth.emailVerified &&
      state.auth.phoneNumber, // TODO: test this
  );

export const selectIsAuthLoading = (state: ApplicationState) =>
  state.auth.loading;
