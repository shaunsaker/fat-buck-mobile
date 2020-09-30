import { getCountryInfoByName } from '../../services/countriesInfo';
import { ApplicationState } from '../reducers';

export const selectCountry = (state: ApplicationState) =>
  getCountryInfoByName(state.country.countryName);
