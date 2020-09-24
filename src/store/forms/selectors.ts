import { ApplicationState } from '../reducers';

export const selectSignInEmailFormField = (state: ApplicationState) =>
  state.forms.signIn.email;

export const selectSignInPasswordFormField = (state: ApplicationState) =>
  state.forms.signIn.password;

export const selectSignInCellphoneFormField = (state: ApplicationState) =>
  state.forms.signIn.cellphone;

export const selectSignInPinCodeFormField = (state: ApplicationState) =>
  state.forms.signIn.pinCode;

export const selectCountrySelectorSearchField = (state: ApplicationState) =>
  state.forms.countrySelector.search;
