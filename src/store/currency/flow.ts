import { SagaIterator } from 'redux-saga';
import {
  fork,
  put,
  call,
  takeEvery,
  takeLatest,
  take,
} from 'redux-saga/effects';
import { createFirestoreSyncChannel } from '../../services/db';
import { showSnackbar } from '../actions';
import firestore from '@react-native-firebase/firestore';
import {
  setSelectedCurrency,
  syncCurrency,
  syncCurrencyError,
  syncCurrencySuccess,
} from './actions';
import { selectIsAuthenticated } from '../auth/selectors';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { Currency, CurrencyActionTypes } from './models';
import { AuthActionTypes } from '../auth/models';
import { CountryActionTypes, CountryInfo } from '../country/models';
import { ActionType } from 'typesafe-actions';
import { setCountryName } from '../country/actions';
import countryInfo from 'countries-information';
import { selectSelectedCurrency } from './selectors';
import { select } from '../../utils/typedSelect';

export function* watchSetCountryFlow(): SagaIterator {
  yield takeLatest(CountryActionTypes.SET_COUNTRY_NAME, function* (
    action: ActionType<typeof setCountryName>,
  ): SagaIterator {
    const country: CountryInfo = countryInfo.getCountryInfoByName(
      action.payload.countryName,
    );
    const currency = country.currencies[0];
    yield put(setSelectedCurrency(currency));
  });
}

export function* watchSyncCurrencyFlow(): SagaIterator {
  yield takeLatest(
    CurrencyActionTypes.SYNC_CURRENCY,
    function* (): SagaIterator {
      try {
        const selectedCurrency = yield* select(selectSelectedCurrency);
        const ref = firestore()
          .collection('exchangeRates')
          .doc(selectedCurrency);
        const channel = yield call(createFirestoreSyncChannel, ref);

        yield takeEvery(channel, function* (currency: Currency) {
          yield put(syncCurrencySuccess(currency));
        });

        // TODO: this isn't working entirely, still getting firestore permission errors
        yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
        channel.close();

        // TODO: if there is no selected currency, set it to USD
      } catch (error) {
        yield put(syncCurrencyError());
        yield put(showSnackbar(error.message));
      }
    },
  );
}

export function* syncCurrencyFlow(): SagaIterator {
  yield put(syncCurrency());
}

export function* currencyFlow(): SagaIterator {
  yield fork(watchSetCountryFlow);
  yield fork(watchSyncCurrencyFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    onlySelectorTruthyOrChanged,
    selectSelectedCurrency,
    syncCurrencyFlow,
  );
}
