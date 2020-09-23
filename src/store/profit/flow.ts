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
import { Profit, ProfitActionTypes } from './models';
import { syncProfit, syncProfitSuccess } from './actions';
import { selectActiveBotId } from '../activeBot/selectors';
import { select } from '../../utils/typedSelect';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';

export function* watchSyncProfitFlow(): SagaIterator {
  yield takeLatest(ProfitActionTypes.SYNC_PROFIT, function* (): SagaIterator {
    try {
      const activeBotId = yield* select(selectActiveBotId);

      // use the activeBotId to sync to the relevant profit section
      const ref = firestore()
        .collection('bots')
        .doc(activeBotId)
        .collection('profit');
      const channel = yield call(createFirestoreSyncChannel, ref);

      yield takeEvery(channel, function* (data: Profit[]) {
        const latest = data[0];
        yield put(syncProfitSuccess(latest));
      });

      // TODO: this isn't working entirely, still getting firestore permission errors
      yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
      channel.close();
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  });
}

export function* syncProfitFlow(): SagaIterator {
  yield put(syncProfit());
}

export function* profitFlow(): SagaIterator {
  yield fork(watchSyncProfitFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    onlySelectorTruthyOrChanged,
    selectActiveBotId,
    syncProfitFlow,
  );
}
