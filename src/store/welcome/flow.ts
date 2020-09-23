import { SagaIterator } from 'redux-saga';
import { fork, take, put } from 'redux-saga/effects';
import { AuthActionTypes } from '../auth/models';
import { setHasSeenWelcome } from './actions';

export function* watchSignInSuccessFlow(): SagaIterator {
  yield take(AuthActionTypes.FINALISE_SIGN_IN_SUCCESS);
  yield put(setHasSeenWelcome(true));
}

// on sign in success, set welcome
export function* welcomeFlow(): SagaIterator {
  yield fork(watchSignInSuccessFlow);
}
