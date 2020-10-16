import { combineReducers } from 'redux';
import { sideMenuReducer } from './sideMenu/reducer';
import { SideMenuState } from './sideMenu/models';
import { authReducer } from './auth/reducer';
import { AuthState } from './auth/models';
import { welcomeReducer } from './welcome/reducer';
import { WelcomeState } from './welcome/models';
import { profitReducer } from './profit/reducer';
import { ProfitState } from './profit/models';
import { activeBotsReducer } from './activeBots/reducer';
import { ActiveBotsState } from './activeBots/models';
import { balanceReducer } from './balance/reducer';
import { BalanceState } from './balance/models';
import { tradesReducer } from './trades/reducer';
import { TradesState } from './trades/models';
import { userReducer } from './user/reducer';
import { UserState } from './user/models';
import { CountryState } from './country/models';
import { countryReducer } from './country/reducer';
import { CurrencyState } from './currency/models';
import { currencyReducer } from './currency/reducer';
import { WalletsState } from './wallets/models';
import { walletsReducer } from './wallets/reducer';
import { SlidersState } from './sliders/models';
import { slidersReducer } from './sliders/reducer';
import { TransactionsState } from './transactions/models';
import { transactionsReducer } from './transactions/reducer';
import { DepositCallsState } from './depositCalls/models';
import { depositCallsReducer } from './depositCalls/reducer';

export interface ApplicationState {
  sideMenu: SideMenuState;
  auth: AuthState;
  welcome: WelcomeState;
  profit: ProfitState;
  activeBots: ActiveBotsState;
  balance: BalanceState;
  trades: TradesState;
  user: UserState;
  country: CountryState;
  currency: CurrencyState;
  wallets: WalletsState;
  sliders: SlidersState;
  transactions: TransactionsState;
  depositCalls: DepositCallsState;
}

export const rootReducer = combineReducers({
  sideMenu: sideMenuReducer,
  auth: authReducer,
  welcome: welcomeReducer,
  profit: profitReducer,
  activeBots: activeBotsReducer,
  balance: balanceReducer,
  trades: tradesReducer,
  user: userReducer,
  country: countryReducer,
  currency: currencyReducer,
  wallets: walletsReducer,
  sliders: slidersReducer,
  transactions: transactionsReducer,
  depositCalls: depositCallsReducer,
});

export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
