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
  TransactionData,
  TransactionsActionTypes,
  Transactions,
} from './models';
import { syncTransactions, syncTransactionsSuccess } from './actions';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { selectIsAuthenticated } from '../auth/selectors';
import { AuthActionTypes } from '../auth/models';
import { select } from '../../utils/typedSelect';
import { selectUserUid } from '../user/selectors';

export function* onSyncTransactionsChannelFlow(data: TransactionData[]) {
  const newData: Transactions = {};
  data.forEach((transaction) => {
    newData[transaction.id] = transaction;
  });

  yield put(syncTransactionsSuccess(newData));
}

export function* onSyncTransactionsFlow(): SagaIterator {
  try {
    const userId = (yield* select(selectUserUid)) as string; // it is definitely defined at this point
    const ref = firestore()
      .collection('transactions')
      .where('uid', '==', userId);
    const channel = yield call(createFirestoreSyncChannel, ref);

    yield takeEvery(channel, onSyncTransactionsChannelFlow);

    // TODO: this isn't working entirely, still getting firestore permission errors
    yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
    channel.close();
  } catch (error) {
    yield put(showSnackbar(error.message));
  }
}

export function* watchSyncTransactionsFlow(): SagaIterator {
  yield takeLatest(
    TransactionsActionTypes.SYNC_TRANSACTIONS,
    onSyncTransactionsFlow,
  );
}

export function* syncTransactionsFlow(): SagaIterator {
  yield put(syncTransactions());
}

export function* transactionsFlow(): SagaIterator {
  yield fork(watchSyncTransactionsFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    syncTransactionsFlow,
  );
}
