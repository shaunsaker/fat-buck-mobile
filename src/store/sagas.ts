import { all, fork } from 'redux-saga/effects';
import { activeBotsFlow } from './activeBots/flow';
import { authFlow } from './auth/flow';
import { balanceFlow } from './balance/flow';
import { profitFlow } from './profit/flow';
import { snackbarFlow } from './snackbar/flow';
import { tradesFlow } from './trades/flow';
import { welcomeFlow } from './welcome/flow';
import { userFlow } from './user/flow';
import { currencyFlow } from './currency/flow';
import { walletsFlow } from './wallets/flow';
import { transactionsFlow } from './transactions/flow';
import { depositCallsFlow } from './depositCalls/flow';
import { navigationFlow } from './navigation/flow';
import { clipboardFlow } from './clipboard/flow';
import { servicesFlow } from './services/flow';
import { messagingFlow } from './messaging/flow';

function* rootSaga() {
  yield all([fork(authFlow)]);
  yield all([fork(snackbarFlow)]);
  yield all([fork(profitFlow)]);
  yield all([fork(activeBotsFlow)]);
  yield all([fork(balanceFlow)]);
  yield all([fork(tradesFlow)]);
  yield all([fork(welcomeFlow)]);
  yield all([fork(userFlow)]);
  yield all([fork(currencyFlow)]);
  yield all([fork(walletsFlow)]);
  yield all([fork(transactionsFlow)]);
  yield all([fork(depositCallsFlow)]);
  yield all([fork(navigationFlow)]);
  yield all([fork(clipboardFlow)]);
  yield all([fork(servicesFlow)]);
  yield all([fork(messagingFlow)]);
}

export default rootSaga;
