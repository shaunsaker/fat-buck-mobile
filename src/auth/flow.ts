import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import {
  initiateCreateUser,
  initiateCreateUserSuccess,
  signOutSuccess,
  signOutError,
  signInError,
  verifyPinCode,
  verifyPinCodeSuccess,
} from './actions';
import { AuthActionTypes } from './models';
import { selectAuthConfirmationResult, selectIsAuthLoading } from './selectors';
import { REHYDRATE } from 'redux-persist';
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

export function* authRehydrateFlow(): SagaIterator {
  // we don't want to persist auth loading state but we can't blacklist it because it's not it's own reducer
  // let's reset it on rehydrate
  yield takeLatest(REHYDRATE, function* (): SagaIterator {
    const isLoading = yield* select(selectIsAuthLoading);

    if (isLoading) {
      yield put(signInError());
    }
  });
}

export const SIGN_IN_SUCCESS_MESSAGE = 'Sign in success.';
export const USER_NOT_FOUND_ERROR_MESSAGE =
  '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.';

export function* initiateCreateUserFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.INITIATE_CREATE_USER, function* (
    action: ActionType<typeof initiateCreateUser>,
  ): SagaIterator {
    try {
      const confirmationResult = yield call(
        firebaseSignInWithPhoneNumber,
        action.payload.cellphone,
      );

      yield put(initiateCreateUserSuccess(confirmationResult));
    } catch (error) {
      yield put(signInError());
      yield put(showSnackbar(error.message));
    }
  });
}

export function* verifyPinCodeFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.VERIFY_PIN_CODE, function* (
    action: ActionType<typeof verifyPinCode>,
  ): SagaIterator {
    const confirmationResult = yield* select(selectAuthConfirmationResult);
    try {
      const {
        user: { email },
      }: FirebaseAuthTypes.UserCredential = yield call(
        firebaseVerifyPinCode,
        action.payload.pinCode,
        confirmationResult,
      );
      const emailCredential = yield call(
        firebaseGetEmailCredential,
        action.payload.email,
        action.payload.password,
      );

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

      yield put(verifyPinCodeSuccess(user));
      yield put(showSnackbar('Sign in success.'));
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
  yield fork(authRehydrateFlow);
  yield fork(initiateCreateUserFlow);
  yield fork(verifyPinCodeFlow);
  yield fork(signOutFlow);
}
