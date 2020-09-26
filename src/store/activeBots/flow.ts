import { SagaIterator } from 'redux-saga';
import {
  fork,
  put,
  call,
  takeEvery,
  takeLatest,
  take,
  all,
} from 'redux-saga/effects';
import { createFirestoreSyncChannel } from '../../services/db';
import { showSnackbar } from '../actions';
import firestore from '@react-native-firebase/firestore';
import {
  syncActiveBots,
  syncActiveBotsError,
  syncActiveBotsSuccess,
} from './actions';
import { selectIsAuthenticated } from '../auth/selectors';
import { onlySelectorTruthyOrChanged } from '../../utils/onlySelectorTruthyOrChanged';
import { ActiveBotsActionTypes } from './models';
import { AuthActionTypes } from '../auth/models';
import { select } from '../../utils/typedSelect';
import { selectActiveBotIds } from './selectors';

export function* watchSyncActiveBotsFlow(): SagaIterator {
  yield takeLatest(
    ActiveBotsActionTypes.SYNC_ACTIVE_BOTS,
    function* (): SagaIterator {
      try {
        const activeBotsRef = firestore()
          .collection('bots')
          .where('isActive', '==', true);
        const activeBotsChannel = yield call(
          // @ts-ignore FIXME
          createFirestoreSyncChannel,
          activeBotsRef,
        );

        yield takeEvery(activeBotsChannel, function* (bots: { id: string }[]) {
          const botIds = bots.map((bot) => bot.id);
          yield put(syncActiveBotsSuccess(botIds));
        });

        // TODO: this isn't working entirely, still getting firestore permission errors
        yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
        activeBotsChannel.close();
      } catch (error) {
        yield put(syncActiveBotsError());
        yield put(showSnackbar(error.message));
      }
    },
  );
}

export function* syncActiveBotsFlow(): SagaIterator {
  yield put(syncActiveBots());
}

// FIXME: type the action properly
export function* watchSyncActiveBotsSuccessFlow(action: any): SagaIterator {
  yield takeLatest(
    ActiveBotsActionTypes.SYNC_ACTIVE_BOTS_SUCCESS,
    function* (): SagaIterator {
      const botIds = yield* select(selectActiveBotIds);
      const actions = botIds.map((botId) => put(action(botId)));
      yield all(actions);
    },
  );
}

export function* activeBotsFlow(): SagaIterator {
  yield fork(watchSyncActiveBotsFlow);
  yield fork(
    onlySelectorTruthyOrChanged,
    selectIsAuthenticated,
    syncActiveBotsFlow,
  );
}
