import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import {
  initiateSignIn,
  initiateSignInSuccess,
  signOutSuccess,
  signOutError,
  signInError,
  finaliseSignIn,
  finaliseSignInSuccess,
} from './actions';
import { AuthActionTypes } from './models';
import { selectAuthConfirmationResult } from './selectors';
import {
  firebaseGetEmailCredential,
  firebaseSignInWithCredential,
  firebaseLinkWithCredential,
  firebaseSignInWithPhoneNumber,
  firebaseSignOut,
  firebaseVerifyPinCode,
} from './services';
import { setSideMenuIsOpen, showSnackbar } from '../store/actions';
import { select } from '../utils/typedSelect';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function* initiateSignInFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.INITIATE_SIGN_IN, function* (
    action: ActionType<typeof initiateSignIn>,
  ): SagaIterator {
    try {
      const confirmationResult = yield call(
        firebaseSignInWithPhoneNumber,
        action.payload.cellphone,
      );

      yield put(initiateSignInSuccess(confirmationResult));
    } catch (error) {
      yield put(signInError());
      yield put(showSnackbar(error.message));
    }
  });
}

export const SIGN_IN_SUCCESS_MESSAGE = 'Sign in success.';

export function* finaliseSignInFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.FINALISE_SIGN_IN, function* (
    action: ActionType<typeof finaliseSignIn>,
  ): SagaIterator {
    const confirmationResult = yield* select(selectAuthConfirmationResult);
    try {
      const {
        user: { email }, // if email is returned, its an existing user
      }: FirebaseAuthTypes.UserCredential = yield call(
        firebaseVerifyPinCode,
        action.payload.pinCode,
        confirmationResult,
      );
      console.log({ email });
      const emailCredential = yield call(
        firebaseGetEmailCredential,
        action.payload.email,
        action.payload.password,
      );
      console.log({ emailCredential });

      // if its an existing user, we sign in with the email credential
      // otherwise, we link the phone auth user with the email credential
      const isExistingUser = Boolean(email);
      const {
        user: { _user: user },
      } = yield call(
        isExistingUser
          ? firebaseSignInWithCredential
          : firebaseLinkWithCredential,
        emailCredential,
      );

      yield put(finaliseSignInSuccess(user));
      yield put(showSnackbar(SIGN_IN_SUCCESS_MESSAGE));
    } catch (error) {
      yield put(signInError());
      yield put(showSnackbar(error.message));
    }
  });
}

export const SIGN_OUT_SUCCESS_MESSAGE = 'Sign out success.';

export function* signOutFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.SIGN_OUT, function* (): SagaIterator {
    try {
      yield call(firebaseSignOut);
      yield put(signOutSuccess());
      yield put(setSideMenuIsOpen(false));
      yield put(showSnackbar(SIGN_OUT_SUCCESS_MESSAGE));
    } catch (error) {
      yield put(signOutError());
      yield put(showSnackbar(error.message));
    }
  });
}

export function* authFlow(): SagaIterator {
  yield fork(initiateSignInFlow);
  yield fork(finaliseSignInFlow);
  yield fork(signOutFlow);
}
