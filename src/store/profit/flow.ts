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
import { ProfitData, ProfitActionTypes } from './models';
import { syncProfit, syncProfitSuccess } from './actions';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';
import { ActionType } from 'typesafe-actions';
import { watchSyncActiveBotsSuccessFlow } from '../activeBots/flow';

export function* watchSyncProfitFlow(): SagaIterator {
  yield takeLatest(ProfitActionTypes.SYNC_PROFIT, function* (
    action: ActionType<typeof syncProfit>,
  ): SagaIterator {
    try {
      const { botId } = action.payload;
      const ref = firestore()
        .collection('bots')
        .doc(botId)
        .collection('profit')
        .doc('latest');
      const channel = yield call(createFirestoreSyncChannel, ref);

      yield takeEvery(channel, function* (data: ProfitData) {
        yield put(syncProfitSuccess(botId, data));
      });

      // TODO: this isn't working entirely, still getting firestore permission errors
      yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
      channel.close();
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  });
}

export function* profitFlow(): SagaIterator {
  yield fork(watchSyncProfitFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    watchSyncActiveBotsSuccessFlow,
    syncProfit,
  );
}
