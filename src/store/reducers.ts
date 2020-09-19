import { combineReducers } from 'redux';
import { sideMenuReducer } from '../sideMenu/reducer';
import { SideMenuState } from '../sideMenu/models';
import { authReducer } from '../auth/reducer';
import { AuthState } from '../auth/models';
import { welcomeReducer } from '../welcome/reducer';
import { WelcomeState } from '../welcome/models';

export interface ApplicationState {
  sideMenu: SideMenuState;
  auth: AuthState;
  welcome: WelcomeState;
}

const rootReducer = combineReducers({
  sideMenu: sideMenuReducer,
  auth: authReducer,
  welcome: welcomeReducer,
});

export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
