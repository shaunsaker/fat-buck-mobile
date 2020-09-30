import countriesInfo from 'countries-information';
import { CountryInfo } from '../../store/country/models';

export const getAllCountries = (): CountryInfo[] =>
  countriesInfo.getAllCountries().filter((country: CountryInfo) => country.ioc); // only countries that have an international country code

export const getCountryInfoByName = (countryName: string): CountryInfo =>
  countriesInfo.getCountryInfoByName(countryName);
