import { ApplicationState } from '../reducers';

export const selectSignInEmailFormField = (state: ApplicationState) => {
  return state.forms.signIn.email;
};

export const selectSignInPasswordFormField = (state: ApplicationState) => {
  return state.forms.signIn.password;
};

export const selectSignInCellphoneFormField = (state: ApplicationState) => {
  return state.forms.signIn.cellphone;
};

export const selectSignInPinCodeFormField = (state: ApplicationState) => {
  return state.forms.signIn.pinCode;
};
