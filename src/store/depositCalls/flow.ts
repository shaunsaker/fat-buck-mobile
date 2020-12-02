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
  DepositCallData,
  DepositCallsActionTypes,
  DepositCalls,
} from './models';
import {
  createDepositCall,
  createDepositCallError,
  createDepositCallSuccess,
  syncDepositCalls,
  syncDepositCallsError,
  syncDepositCallsSuccess,
} from './actions';
import { AuthActionTypes } from '../auth/models';
import { select } from '../../utils/typedSelect';
import { selectUserUid } from '../user/selectors';
import { firebaseCreateDepositCall } from '../../services/callable';
import { selectDepositSliderIndex } from '../sliders/selectors';
import { setSliderIndex } from '../sliders/actions';
import { Sliders } from '../sliders/models';
import { ActionType } from 'typesafe-actions';

export function* onSyncDepositCallsChannelFlow(data: DepositCallData[]) {
  const newData: DepositCalls = {};
  data.forEach((depositCall) => {
    newData[depositCall.id] = depositCall;
  });

  yield put(syncDepositCallsSuccess(newData));
}

export function* onSyncDepositCallsFlow(): SagaIterator {
  try {
    const userId = (yield* select(selectUserUid)) as string; // it is definitely defined at this point
    const ref = firestore()
      .collection('depositCalls')
      .where('uid', '==', userId);
    const channel = yield call(createFirestoreSyncChannel, ref);

    yield takeEvery(channel, onSyncDepositCallsChannelFlow);

    // TODO: this isn't working entirely, still getting firestore permission errors
    yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
    channel.close();
  } catch (error) {
    yield put(showSnackbar(error.message));
    yield put(syncDepositCallsError());
  }
}

export function* watchSyncDepositCallsFlow(): SagaIterator {
  yield takeLatest(
    DepositCallsActionTypes.SYNC_DEPOSIT_CALLS,
    onSyncDepositCallsFlow,
  );
}

export function* syncDepositCallsFlow(): SagaIterator {
  yield put(syncDepositCalls());
}

export function* onCreateDepositCallFlow(
  action: ActionType<typeof createDepositCall>,
): SagaIterator {
  try {
    const error = yield call(
      firebaseCreateDepositCall,
      action.payload.walletAddress,
    );

    if (error) {
      yield put(showSnackbar(error.message));
      yield put(createDepositCallError());
    } else {
      // increase the deposit slider index
      const slideIndex = yield* select(selectDepositSliderIndex);
      yield put(setSliderIndex(Sliders.deposit, slideIndex + 1));
      yield put(createDepositCallSuccess());
    }
  } catch (error) {
    yield put(showSnackbar(error.message));
    yield put(createDepositCallError());
  }
}

export function* watchCreateDepositCallFlow(): SagaIterator {
  yield takeLatest(
    DepositCallsActionTypes.CREATE_DEPOSIT_CALL,
    onCreateDepositCallFlow,
  );
}

export function* depositCallsFlow(): SagaIterator {
  yield fork(watchSyncDepositCallsFlow);
  yield fork(syncDepositCallsFlow);
  yield fork(watchCreateDepositCallFlow);
}
