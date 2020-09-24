export enum CountryActionTypes {
  SET_COUNTRY_NAME = '@@country/SET_COUNTRY_NAME',
}

export interface CountryInfo {
  countryCallingCodes: string[];
  currencies: string[];
  emoji: string;
  ioc: string;
  name: string;
}

export interface CountryState {
  countryName: string;
}
