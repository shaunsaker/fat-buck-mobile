import { SagaIterator } from 'redux-saga';
import { fork, put, call, takeEvery, take } from 'redux-saga/effects';
import { createFirestoreSyncChannel } from '../../services/db';
import { showSnackbar } from '../actions';
import firestore from '@react-native-firebase/firestore';
import { BalanceData, BalanceActionTypes } from './models';
import { syncBalanceSuccess } from './actions';
import { AuthActionTypes } from '../auth/models';

export function* onSyncBalanceChannelFlow(data: BalanceData) {
  yield put(syncBalanceSuccess(data));
}

export function* syncBalanceFlow(): SagaIterator {
  try {
    const ref = firestore().collection('pool').doc('balance');
    const channel = yield call(createFirestoreSyncChannel, ref);

    yield takeEvery(channel, (data: BalanceData) =>
      onSyncBalanceChannelFlow(data),
    );

    // TODO: this isn't working entirely, still getting firestore permission errors
    yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
    channel.close();
  } catch (error) {
    yield put(showSnackbar(error.message));
  }
}

export function* watchSyncBalanceFlow(): SagaIterator {
  yield takeEvery(BalanceActionTypes.SYNC_BALANCE, syncBalanceFlow);
}

export function* balanceFlow(): SagaIterator {
  yield fork(watchSyncBalanceFlow);
  yield fork(syncBalanceFlow);
}
