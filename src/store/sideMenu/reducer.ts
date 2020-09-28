import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { setSideMenuIsOpen } from './actions';
import { SideMenuState } from './models';

export const initialState: SideMenuState = {
  isOpen: false,
};

const reducerActions = {
  setSideMenuIsOpen,
};

// FIXME
export const sideMenuReducer: Reducer<SideMenuState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    case getType(setSideMenuIsOpen): {
      return { ...state, isOpen: action.payload.isOpen };
    }
    default: {
      return state;
    }
  }
};
