import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { getCountryInfoByName } from '../../services/countriesInfo';
import { setCountryName } from '../country/actions';
import { CountryInfo } from '../country/models';
import { showSnackbar } from '../snackbar/actions';
import { setSelectedCurrency, syncCurrencySuccess } from './actions';
import {
  getCurrencyNotSupportedMessage,
  onSetCountryNameFlow,
  onSyncCurrencyChannelFlow,
} from './flow';
import { CurrencyData, DEFAULT_CURRENCY } from './models';

describe('currency flow', () => {
  describe('onSetCountryNameFlow', () => {
    it('sets the selected currency', () => {
      const countryInfo: CountryInfo = {
        countryCallingCodes: [],
        currencies: ['AUD'],
        emoji: '',
        ioc: '',
        name: '',
      };

      return expectSaga(onSetCountryNameFlow, setCountryName('Australia'))
        .provide([[matchers.call.fn(getCountryInfoByName), countryInfo]])
        .put(setSelectedCurrency(countryInfo.currencies[0]))
        .run();
    });
  });

  describe('onSyncCurrencyChannelFlow', () => {
    it('sets the currency if it has a rate', () => {
      const currencyData: CurrencyData = {
        base: '',
        dateUpdated: '',
        symbol: '',
        rate: 1,
        id: '1',
      };

      return expectSaga(onSyncCurrencyChannelFlow, currencyData)
        .put(syncCurrencySuccess(currencyData))
        .run();
    });

    it('sets the default currency if the provided currency does not have a rate', () => {
      const currencyData: CurrencyData = {
        base: '',
        dateUpdated: '',
        symbol: '',
        rate: 0,
        id: 'AES',
      };

      return expectSaga(onSyncCurrencyChannelFlow, currencyData)
        .put(setSelectedCurrency(DEFAULT_CURRENCY))
        .put(showSnackbar(getCurrencyNotSupportedMessage(currencyData.id)))
        .run();
    });
  });
});
