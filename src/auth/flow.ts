import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import {
  createUserWithEmailAndPassword,
  createUserWithEmailAndPasswordSuccess,
  signOutSuccess,
  signOutError,
  signInError,
} from './actions';
import { AuthActionTypes } from './models';
import { selectIsAuthLoading } from './selectors';
import { REHYDRATE } from 'redux-persist';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  firebaseCreateUserWithEmailAndPassword,
  firebaseSendEmailVerification,
  firebaseSignOut,
} from './services';
import { setSideMenuIsOpen, showSnackbar } from '../store/actions';
import { select } from '../utils/typedSelect';

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

export function* createUserWithEmailAndPasswordFlow(): SagaIterator {
  yield takeLatest(
    AuthActionTypes.CREATE_USER_WITH_EMAIL_AND_PASSWORD,
    function* (
      action: ActionType<typeof createUserWithEmailAndPassword>,
    ): SagaIterator {
      try {
        const {
          user: { _user: user },
        } = yield call(
          firebaseCreateUserWithEmailAndPassword,
          action.payload.email,
          action.payload.password,
        );
        yield call(firebaseSendEmailVerification);
        yield put(createUserWithEmailAndPasswordSuccess(user));
      } catch (error) {
        yield put(signInError());
        yield put(showSnackbar(error.message));
      }
    },
  );
}

export const SIGN_OUT_SUCCESS_MESSAGE = 'Sign out success.';

export function* signOutFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.SIGN_OUT, function* (): SagaIterator {
    yield call(firebaseSignOut);
    yield put(signOutSuccess());
    yield put(setSideMenuIsOpen(false));
    yield put(showSnackbar(SIGN_OUT_SUCCESS_MESSAGE));
  });
}

export function* authFlow(): SagaIterator {
  yield fork(authRehydrateFlow);
  yield fork(createUserWithEmailAndPasswordFlow);
  yield fork(signOutFlow);
}
