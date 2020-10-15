import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { DepositCallsActionTypes, DepositCallsState } from './models';

export const initialState: DepositCallsState = {
  loading: false,
  data: {},
};

export const depositCallsReducer: Reducer<DepositCallsState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.depositCalls,
        loading: false,
      };
    }
    case DepositCallsActionTypes.SYNC_DEPOSIT_CALLS: {
      return {
        ...state,
        loading: true,
      };
    }
    case DepositCallsActionTypes.SYNC_DEPOSIT_CALLS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.depositCalls,
      };
    }
    case DepositCallsActionTypes.SYNC_DEPOSIT_CALLS_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case DepositCallsActionTypes.CREATE_DEPOSIT_CALL: {
      return {
        ...state,
        loading: true,
      };
    }
    case DepositCallsActionTypes.CREATE_DEPOSIT_CALL_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case DepositCallsActionTypes.CREATE_DEPOSIT_CALL_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
