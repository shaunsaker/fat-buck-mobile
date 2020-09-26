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
import { Trade, Trades, TradesActionTypes } from './models';
import { syncTrades, syncTradesSuccess } from './actions';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';
import { watchSyncActiveBotsSuccessFlow } from '../activeBots/flow';
import { ActionType } from 'typesafe-actions';

export function* watchSyncTradesFlow(): SagaIterator {
  yield takeLatest(TradesActionTypes.SYNC_TRADES, function* (
    action: ActionType<typeof syncTrades>,
  ): SagaIterator {
    try {
      const { botId } = action.payload;
      const ref = firestore()
        .collection('bots')
        .doc(botId)
        .collection('trades');
      const channel = yield call(createFirestoreSyncChannel, ref);

      yield takeEvery(channel, function* (data: Trade[]) {
        // attach botId
        const newData: Trades = {};
        data.forEach((trade) => {
          newData[trade.id] = {
            ...trade,
            botId: botId,
          };
        });

        yield put(syncTradesSuccess(newData));
      });

      // TODO: this isn't working entirely, still getting firestore permission errors
      yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
      channel.close();
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  });
}

export function* tradesFlow(): SagaIterator {
  yield fork(watchSyncTradesFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    watchSyncActiveBotsSuccessFlow,
    syncTrades,
  );
}
