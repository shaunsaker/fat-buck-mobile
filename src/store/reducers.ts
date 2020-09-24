import { combineReducers } from 'redux';
import { sideMenuReducer } from './sideMenu/reducer';
import { SideMenuState } from './sideMenu/models';
import { authReducer } from './auth/reducer';
import { AuthState } from './auth/models';
import { welcomeReducer } from './welcome/reducer';
import { WelcomeState } from './welcome/models';
import { formsReducer } from './forms/reducer';
import { FormsState } from './forms/models';
import { profitReducer } from './profit/reducer';
import { ProfitState } from './profit/models';
import { activeBotReducer } from './activeBot/reducer';
import { ActiveBotState } from './activeBot/models';
import { balanceReducer } from './balance/reducer';
import { BalanceState } from './balance/models';
import { tradesReducer } from './trades/reducer';
import { TradesState } from './trades/models';
import { userReducer } from './user/reducer';
import { UserState } from './user/models';
import { CountryState } from './country/models';
import { countryReducer } from './country/reducer';

export interface ApplicationState {
  sideMenu: SideMenuState;
  auth: AuthState;
  welcome: WelcomeState;
  forms: FormsState;
  profit: ProfitState;
  activeBot: ActiveBotState;
  balance: BalanceState;
  trades: TradesState;
  user: UserState;
  country: CountryState;
}

const rootReducer = combineReducers({
  sideMenu: sideMenuReducer,
  auth: authReducer,
  welcome: welcomeReducer,
  forms: formsReducer,
  profit: profitReducer,
  activeBot: activeBotReducer,
  balance: balanceReducer,
  trades: tradesReducer,
  user: userReducer,
  country: countryReducer,
});

export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
