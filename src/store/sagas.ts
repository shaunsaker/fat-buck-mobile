import { all, fork } from 'redux-saga/effects';
import { authFlow } from '../auth/flow';
import { snackbarFlow } from '../snackbar/flow';

function* rootSaga() {
  yield all([fork(authFlow)]);
  yield all([fork(snackbarFlow)]);
}

export default rootSaga;
