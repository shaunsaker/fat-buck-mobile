export enum Forms {
  signIn = 'signIn',
  countrySelector = 'countrySelector',
}

export enum SignInFields {
  email = 'email',
  password = 'password',
  cellphone = 'cellphone',
  pinCode = 'pinCode',
}

export enum CountrySelectorFields {
  search = 'search',
}

export type FormFields = SignInFields | CountrySelectorFields;

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
  countrySelector: {
    search: string;
  };
}
