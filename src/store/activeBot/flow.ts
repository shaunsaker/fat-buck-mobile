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
import { syncActiveBot, syncActiveBotSuccess } from './actions';
import { selectIsAuthenticated } from '../auth/selectors';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { ActiveBotActionTypes } from './models';
import { AuthActionTypes } from '../auth/models';

export function* watchSyncActiveBotFlow(): SagaIterator {
  yield takeLatest(
    ActiveBotActionTypes.SYNC_ACTIVE_BOT,
    function* (): SagaIterator {
      try {
        const activeBotRef = firestore().collection('activeBot');
        const activeBotChannel = yield call(
          createFirestoreSyncChannel,
          activeBotRef,
        );

        yield takeEvery(activeBotChannel, function* (bots: { id: string }[]) {
          const activeBotId = bots[0].id;
          yield put(syncActiveBotSuccess(activeBotId));
        });

        // TODO: this isn't working entirely, still getting firestore permission errors
        yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
        activeBotChannel.close();
      } catch (error) {
        yield put(showSnackbar(error.message));
      }
    },
  );
}

export function* syncActiveBotFlow(): SagaIterator {
  yield put(syncActiveBot());
}

export function* activeBotFlow(): SagaIterator {
  yield fork(watchSyncActiveBotFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    syncActiveBotFlow,
  );
}
