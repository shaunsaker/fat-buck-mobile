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
import { Balance, BalanceActionTypes } from './models';
import { syncBalance, syncBalanceSuccess } from './actions';
import { selectActiveBotId } from '../activeBot/selectors';
import { select } from '../../utils/typedSelect';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';

export function* watchSyncBalanceFlow(): SagaIterator {
  yield takeLatest(BalanceActionTypes.SYNC_BALANCE, function* (): SagaIterator {
    try {
      const activeBotId = yield* select(selectActiveBotId);

      // use the activeBotId to sync to the relevant balance section
      const ref = firestore()
        .collection('bots')
        .doc(activeBotId)
        .collection('balance');
      const channel = yield call(createFirestoreSyncChannel, ref);

      yield takeEvery(channel, function* (data: Balance[]) {
        const latest = data[0];
        yield put(syncBalanceSuccess(latest));
      });

      // TODO: this isn't working entirely, still getting firestore permission errors
      yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
      channel.close();
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  });
}

export function* syncBalanceFlow(): SagaIterator {
  yield put(syncBalance());
}

export function* balanceFlow(): SagaIterator {
  yield fork(watchSyncBalanceFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    onlySelectorTruthyOrChanged,
    selectActiveBotId,
    syncBalanceFlow,
  );
}
