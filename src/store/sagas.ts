import { fork } from 'redux-saga/effects';
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
import { connectSaga } from '../utils/connectSaga';
import { selectIsAuthenticated } from './auth/selectors';

function* authenticatedFlows(isAuthenticated: boolean) {
  if (isAuthenticated) {
    yield fork(profitFlow);
    yield fork(activeBotsFlow);
    yield fork(balanceFlow);
    yield fork(tradesFlow);
    yield fork(currencyFlow);
    yield fork(walletsFlow);
    yield fork(transactionsFlow);
    yield fork(depositCallsFlow);
    yield fork(messagingFlow);
  }
}

function* omnipresentFlows() {
  yield fork(authFlow);
  yield fork(snackbarFlow);
  yield fork(welcomeFlow);
  yield fork(userFlow);
  yield fork(navigationFlow);
  yield fork(clipboardFlow);
  yield fork(servicesFlow);
}

function* rootSaga() {
  yield fork(omnipresentFlows);
  yield fork(() => connectSaga(selectIsAuthenticated, authenticatedFlows));
}

export default rootSaga;
