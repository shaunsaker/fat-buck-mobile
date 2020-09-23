import { Reducer } from 'redux';
import { SideMenuActionTypes, SideMenuState } from './models';

export const initialState: SideMenuState = {
  isOpen: false,
};

export const sideMenuReducer: Reducer<SideMenuState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SideMenuActionTypes.SET_SIDE_MENU_IS_OPEN: {
      return { ...state, isOpen: action.payload.isOpen };
    }
    default: {
      return state;
    }
  }
};
