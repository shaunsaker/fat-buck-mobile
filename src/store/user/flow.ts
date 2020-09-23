import { SagaIterator } from 'redux-saga';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { showSnackbar } from '../actions';
import { User, UserActionTypes } from './models';
import { saveUser, saveUserError, saveUserSuccess } from './actions';
import { AuthActionTypes } from '../auth/models';
import { ActionType } from 'typesafe-actions';
import { signInSuccess } from '../auth/actions';
import { firestoreSaveDocument } from '../../services/db';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export function* watchSaveUserFlow(): SagaIterator {
  yield takeLatest(UserActionTypes.SAVE_USER, function* (
    action: ActionType<typeof saveUser>,
  ): SagaIterator {
    try {
      const ref = firestore()
        .collection('users')
        .doc(action.payload.user.uid as string);
      yield call(firestoreSaveDocument, ref, action.payload.user);
      yield put(saveUserSuccess());
    } catch (error) {
      yield put(saveUserError());
      yield put(showSnackbar(error.message));
    }
  });
}

export function* watchSignInSuccessFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.SIGN_IN_SUCCESS, function* (
    action: ActionType<typeof signInSuccess>,
  ): SagaIterator {
    const dateLastSignedIn = moment().toISOString();
    const user: User = {
      uid: action.payload.user.uid,
      email: action.payload.user.email,
      phoneNumber: action.payload.user.phoneNumber,
      dateLastSignedIn,
    };
    yield put(saveUser(user));
  });
}

export function* userFlow(): SagaIterator {
  yield fork(watchSaveUserFlow);
  yield fork(watchSignInSuccessFlow);
}
