import { SagaIterator } from 'redux-saga';
import { fork, put, call, takeEvery, take } from 'redux-saga/effects';
import { createFirestoreSyncChannel } from '../../services/db';
import { showSnackbar } from '../actions';
import firestore from '@react-native-firebase/firestore';
import { ProfitData, ProfitActionTypes } from './models';
import { syncProfitSuccess } from './actions';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';

export function* onSyncProfitChannelFlow(data: ProfitData) {
  yield put(syncProfitSuccess(data));
}

export function* syncProfitFlow(): SagaIterator {
  try {
    const ref = firestore().collection('pool').doc('profit');
    const channel = yield call(createFirestoreSyncChannel, ref);

    yield takeEvery(channel, (data: ProfitData) =>
      onSyncProfitChannelFlow(data),
    );

    // TODO: this isn't working entirely, still getting firestore permission errors
    yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
    channel.close();
  } catch (error) {
    yield put(showSnackbar(error.message));
  }
}

export function* watchSyncProfitFlow(): SagaIterator {
  yield takeEvery(ProfitActionTypes.SYNC_PROFIT, syncProfitFlow);
}

export function* profitFlow(): SagaIterator {
  yield fork(watchSyncProfitFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    syncProfitFlow,
  );
}
