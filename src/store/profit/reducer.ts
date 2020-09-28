import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ActionType, getType } from 'typesafe-actions';
import {
  setProfitType,
  syncProfit,
  syncProfitError,
  syncProfitSuccess,
} from './actions';
import { ProfitState, ProfitTypes } from './models';

export const initialState: ProfitState = {
  loading: false,
  profitType: ProfitTypes.toDate,
  data: {},
};

const reducerActions = {
  setProfitType,
  syncProfit,
  syncProfitError,
  syncProfitSuccess,
};

export const profitReducer: Reducer<ProfitState> = (
  state = initialState,
  action: ActionType<typeof reducerActions>,
) => {
  switch (action.type) {
    // FIXME: how to type this
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.profit,
        loading: false,
      };
    }
    case getType(syncProfit): {
      return {
        ...state,
        loading: true,
      };
    }
    case getType(syncProfitSuccess): {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.botId]: action.payload.profit,
        },
      };
    }
    case getType(syncProfitError): {
      return {
        ...state,
        loading: false,
      };
    }
    case getType(setProfitType): {
      return {
        ...state,
        profitType: action.payload.profitType,
      };
    }
    default: {
      return state;
    }
  }
};
