import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { TransactionsActionTypes, TransactionsState } from './models';

export const initialState: TransactionsState = {
  loading: false,
  data: {},
};

export const transactionsReducer: Reducer<TransactionsState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.transactions,
        loading: false,
      };
    }
    case TransactionsActionTypes.SYNC_TRANSACTIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case TransactionsActionTypes.SYNC_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.transactions,
      };
    }
    case TransactionsActionTypes.SYNC_TRANSACTIONS_ERROR: {
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
