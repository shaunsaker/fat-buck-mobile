import { SagaIterator } from 'redux-saga';
import { fork, takeLatest } from 'redux-saga/effects';
import { navigate } from '../../Router';
import { NavigateActionTypes } from './models';

export function* onNavigateBackFlow(): SagaIterator {
  navigate();
}

export function* watchNavigateBackFlow(): SagaIterator {
  yield takeLatest(NavigateActionTypes.NAVIGATE_BACK, onNavigateBackFlow);
}

export function* navigationFlow(): SagaIterator {
  yield fork(watchNavigateBackFlow);
}
