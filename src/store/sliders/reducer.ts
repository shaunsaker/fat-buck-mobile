import { Reducer } from 'redux';
import { SlidersActionTypes, SlidersState } from './models';

export const initialState: SlidersState = {
  welcome: 0,
  deposit: 0,
};

export const slidersReducer: Reducer<SlidersState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SlidersActionTypes.SET_SLIDER_INDEX: {
      return {
        ...state,
        [action.payload.slider]: action.payload.index,
      };
    }
    default: {
      return state;
    }
  }
};
