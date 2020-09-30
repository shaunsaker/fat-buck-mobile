import { SagaIterator } from 'redux-saga';
import { fork, put, takeLatest } from 'redux-saga/effects';
import { AuthActionTypes } from '../auth/models';
import { setHasSeenWelcome } from './actions';

export function* onSignInSuccessFlow() {
  yield put(setHasSeenWelcome(true));
}

export function* watchSignInSuccessFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.SIGN_IN_SUCCESS, onSignInSuccessFlow);
}

// on sign in success, set welcome
export function* welcomeFlow(): SagaIterator {
  yield fork(watchSignInSuccessFlow);
}
