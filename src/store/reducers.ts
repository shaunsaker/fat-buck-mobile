import { combineReducers } from 'redux';
import { sideMenuReducer } from '../sideMenu/reducer';
import { SideMenuState } from '../sideMenu/models';
import { authReducer } from '../auth/reducer';
import { AuthState } from '../auth/models';
import { welcomeReducer } from '../welcome/reducer';
import { WelcomeState } from '../welcome/models';
import { formsReducer } from '../forms/reducer';
import { FormsState } from '../forms/models';
import { profitReducer } from '../profit/reducer';
import { ProfitState } from '../profit/models';
import { activeBotReducer } from '../activeBot/reducer';
import { ActiveBotState } from '../activeBot/models';
import { balanceReducer } from '../balance/reducer';
import { BalanceState } from '../balance/models';

export interface ApplicationState {
  sideMenu: SideMenuState;
  auth: AuthState;
  welcome: WelcomeState;
  forms: FormsState;
  profit: ProfitState;
  activeBot: ActiveBotState;
  balance: BalanceState;
}

const rootReducer = combineReducers({
  sideMenu: sideMenuReducer,
  auth: authReducer,
  welcome: welcomeReducer,
  forms: formsReducer,
  profit: profitReducer,
  activeBot: activeBotReducer,
  balance: balanceReducer,
});

export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
