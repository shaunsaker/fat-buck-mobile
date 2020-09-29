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
import { BalanceData, BalanceActionTypes } from './models';
import { syncBalance, syncBalanceSuccess } from './actions';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';
import { ActionType } from 'typesafe-actions';
import { watchSyncActiveBotsSuccessFlow } from '../activeBots/flow';

export function* watchSyncBalanceFlow(): SagaIterator {
  yield takeLatest(BalanceActionTypes.SYNC_BALANCE, function* (
    action: ActionType<typeof syncBalance>,
  ): SagaIterator {
    try {
      const { botId } = action.payload;
      const ref = firestore()
        .collection('bots')
        .doc(botId)
        .collection('balance')
        .doc('latest');
      const channel = yield call(createFirestoreSyncChannel, ref);

      yield takeEvery(channel, function* (data: BalanceData) {
        yield put(syncBalanceSuccess(botId, data));
      });

      // TODO: this isn't working entirely, still getting firestore permission errors
      yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
      channel.close();
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  });
}

export function* balanceFlow(): SagaIterator {
  yield fork(watchSyncBalanceFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    watchSyncActiveBotsSuccessFlow,
    syncBalance,
  );
}
