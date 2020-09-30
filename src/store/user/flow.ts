import { SagaIterator } from 'redux-saga';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { showSnackbar } from '../actions';
import { UserActionTypes, UserData } from './models';
import { saveUser, saveUserError, saveUserSuccess } from './actions';
import { AuthActionTypes } from '../auth/models';
import { ActionType } from 'typesafe-actions';
import { signInSuccess } from '../auth/actions';
import { firestoreSaveDocument } from '../../services/db';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { select } from '../../utils/typedSelect';
import { selectCountry } from '../country/selectors';

export function* onSaveUserFlow(
  action: ActionType<typeof saveUser>,
): SagaIterator {
  try {
    const ref = firestore()
      .collection('users')
      .doc(action.payload.userData.uid as string);
    yield call(firestoreSaveDocument, ref, action.payload.userData);
    yield put(saveUserSuccess());
  } catch (error) {
    yield put(saveUserError());
    yield put(showSnackbar(error.message));
  }
}

export function* watchSaveUserFlow(): SagaIterator {
  yield takeLatest(UserActionTypes.SAVE_USER, onSaveUserFlow);
}

export function* onSignInSuccessFlow(
  action: ActionType<typeof signInSuccess>,
): SagaIterator {
  const dateLastSignedIn = moment().toISOString();
  const country = (yield* select(selectCountry)).name;
  const user: UserData = {
    uid: action.payload.user.uid,
    email: action.payload.user.email,
    cellphone: action.payload.user.phoneNumber,
    country,
    dateLastSignedIn,
  };
  yield put(saveUser(user));
}

export function* watchSignInSuccessFlow(): SagaIterator {
  yield takeLatest(AuthActionTypes.SIGN_IN_SUCCESS, onSignInSuccessFlow);
}

export function* userFlow(): SagaIterator {
  yield fork(watchSaveUserFlow);
  yield fork(watchSignInSuccessFlow);
}
