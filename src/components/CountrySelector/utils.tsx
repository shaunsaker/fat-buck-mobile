import countriesInfo from 'countries-information';
import { CountryInfo } from '../../store/country/models';

export const getCountries = () => {
  const countries: CountryInfo[] = countriesInfo
    .getAllCountries()
    .filter((country: CountryInfo) => country.ioc); // only countries that have an international country code

  return countries;
};

export const filterCountries = (
  countries: CountryInfo[],
  searchValue: string,
) => {
  const filteredCountries = countries.filter((country: CountryInfo) => {
    if (searchValue.length) {
      return country.name.toLowerCase().includes(searchValue.toLowerCase());
    }
    return country;
  });

  return filteredCountries;
};
