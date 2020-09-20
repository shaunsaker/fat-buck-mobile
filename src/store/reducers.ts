import { combineReducers } from 'redux';
import { sideMenuReducer } from '../sideMenu/reducer';
import { SideMenuState } from '../sideMenu/models';
import { authReducer } from '../auth/reducer';
import { AuthState } from '../auth/models';
import { welcomeReducer } from '../welcome/reducer';
import { WelcomeState } from '../welcome/models';
import { formsReducer } from '../forms/reducer';
import { FormsState } from '../forms/models';

export interface ApplicationState {
  sideMenu: SideMenuState;
  auth: AuthState;
  welcome: WelcomeState;
  forms: FormsState;
}

const rootReducer = combineReducers({
  sideMenu: sideMenuReducer,
  auth: authReducer,
  welcome: welcomeReducer,
  forms: formsReducer,
});

export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
