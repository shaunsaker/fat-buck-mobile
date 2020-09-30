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
import { CurrencyData, CurrencyActionTypes, DEFAULT_CURRENCY } from './models';
import { AuthActionTypes } from '../auth/models';
import { CountryActionTypes } from '../country/models';
import { ActionType } from 'typesafe-actions';
import { setCountryName } from '../country/actions';
import { selectSelectedCurrency } from './selectors';
import { select } from '../../utils/typedSelect';
import { getCountryInfoByName } from '../../services/countriesInfo';

export function* onSetCountryNameFlow(
  action: ActionType<typeof setCountryName>,
): SagaIterator {
  const country = getCountryInfoByName(action.payload.countryName);
  const currency = country.currencies[0] || DEFAULT_CURRENCY;
  yield put(setSelectedCurrency(currency));
}

export function* watchSetCountryFlow(): SagaIterator {
  yield takeLatest(CountryActionTypes.SET_COUNTRY_NAME, onSetCountryNameFlow);
}

export const getCurrencyNotSupportedMessage = (currencyId: string) =>
  `${currencyId} not supported. Defaulting to ${DEFAULT_CURRENCY}.`;

export function* onSyncCurrencyChannelFlow(
  currencyData: CurrencyData,
): SagaIterator {
  // if there is no currency rate available (e.g. the exchange does not support AED), set it to USD
  if (!currencyData.rate) {
    yield put(setSelectedCurrency(DEFAULT_CURRENCY));
    yield put(showSnackbar(getCurrencyNotSupportedMessage(currencyData.id)));
  } else {
    yield put(syncCurrencySuccess(currencyData));
  }
}

export function* onSyncCurrencyFlow(): SagaIterator {
  try {
    const selectedCurrency = yield* select(selectSelectedCurrency);
    const ref = firestore().collection('exchangeRates').doc(selectedCurrency);
    const channel = yield call(createFirestoreSyncChannel, ref);

    yield takeEvery(channel, onSyncCurrencyChannelFlow);

    // TODO: this isn't working entirely, still getting firestore permission errors
    yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
    channel.close();
  } catch (error) {
    yield put(syncCurrencyError());
    yield put(showSnackbar(error.message));
  }
}

export function* watchSyncCurrencyFlow(): SagaIterator {
  yield takeLatest(CurrencyActionTypes.SYNC_CURRENCY, onSyncCurrencyFlow);
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
