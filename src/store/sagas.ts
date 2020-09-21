import { all, fork } from 'redux-saga/effects';
import { activeBotFlow } from '../activeBot/flow';
import { authFlow } from '../auth/flow';
import { profitFlow } from '../profit/flow';
import { snackbarFlow } from '../snackbar/flow';

function* rootSaga() {
  yield all([fork(authFlow)]);
  yield all([fork(snackbarFlow)]);
  yield all([fork(profitFlow)]);
  yield all([fork(activeBotFlow)]);
}

export default rootSaga;
