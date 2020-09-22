import { SagaIterator } from 'redux-saga';
import {
  fork,
  put,
  call,
  takeEvery,
  takeLatest,
  take,
} from 'redux-saga/effects';
import { createFirestoreSyncChannel } from '../services/db';
import { showSnackbar } from '../store/actions';
import firestore from '@react-native-firebase/firestore';
import { Trades, TradesActionTypes } from './models';
import { syncTrades, syncTradesSuccess } from './actions';
import { selectActiveBotId } from '../activeBot/selectors';
import { select } from '../utils/typedSelect';
import { onlySelectorTruthyOrChanged } from '../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';

export function* watchSyncTradesFlow(): SagaIterator {
  yield takeLatest(TradesActionTypes.SYNC_TRADES, function* (): SagaIterator {
    try {
      const activeBotId = yield* select(selectActiveBotId);

      // use the activeBotId to sync to the relevant trades section
      const ref = firestore()
        .collection('bots')
        .doc(activeBotId)
        .collection('trades');
      const channel = yield call(createFirestoreSyncChannel, ref);

      yield takeEvery(channel, function* (data: Trades) {
        yield put(syncTradesSuccess(data));
      });

      // TODO: this isn't working entirely, still getting firestore permission errors
      yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
      channel.close();
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  });
}

export function* syncTradesFlow(): SagaIterator {
  yield put(syncTrades());
}

export function* tradesFlow(): SagaIterator {
  yield fork(watchSyncTradesFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    onlySelectorTruthyOrChanged,
    selectActiveBotId,
    syncTradesFlow,
  );
}
