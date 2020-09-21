import { SagaIterator } from 'redux-saga';
import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { createFirestoreSyncChannel } from '../services/db';
import { showSnackbar } from '../store/actions';
import firestore from '@react-native-firebase/firestore';
import { onlyAuthFlow } from '../utils/onlyAuthFlow';
import { Profit } from './models';
import { syncProfitSuccess } from './actions';

export function* syncProfitFlow(): SagaIterator {
  try {
    // TODO: this should be a root function
    // sync the active bot id
    const activeBotRef = firestore().collection('activeBot');
    const activeBotChannel = yield call(
      createFirestoreSyncChannel,
      activeBotRef,
    );

    yield takeEvery(activeBotChannel, function* (bots: { id: string }[]) {
      const activeBotId = bots[0].id;

      // use the activeBotId to sync to the relevant profit section
      const profitRef = firestore()
        .collection('bots')
        .doc(activeBotId)
        .collection('profit');
      const profitChannel = yield call(createFirestoreSyncChannel, profitRef);
      // TODO: can't catch errors in the channel

      yield takeEvery(profitChannel, function* (profits: Profit[]) {
        const profit = profits[0];
        yield put(syncProfitSuccess(profit));
      });
    });
  } catch (error) {
    yield put(showSnackbar(error.message));
  }
}

export function* profitFlow(): SagaIterator {
  yield fork(onlyAuthFlow, syncProfitFlow);
}
