export enum Forms {
  signIn = 'signIn',
}

export enum SignInFields {
  email = 'email',
  password = 'password',
  cellphone = 'cellphone',
  pinCode = 'pinCode',
}

export type FormFields = SignInFields;

export enum FormsActionTypes {
  SET_FORM_FIELD = '@@forms/SET_FORM_FIELD',
}

export interface FormsState {
  signIn: {
    email: string;
    password: string;
    cellphone: string;
    pinCode: string;
  };
}
