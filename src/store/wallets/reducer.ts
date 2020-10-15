import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { WalletsActionTypes, WalletsState } from './models';

export const initialState: WalletsState = {
  loading: false,
  selectedWalletId: '',
  data: {},
};

export const walletsReducer: Reducer<WalletsState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.wallets,
        loading: false,
        selectedWalletId: '',
      };
    }
    case WalletsActionTypes.SYNC_WALLETS: {
      return {
        ...state,
        loading: true,
      };
    }
    case WalletsActionTypes.SYNC_WALLETS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.wallets,
      };
    }
    case WalletsActionTypes.SYNC_WALLETS_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case WalletsActionTypes.SET_SELECTED_WALLET_ID: {
      return {
        ...state,
        selectedWalletId: action.payload.walletId,
      };
    }
    case WalletsActionTypes.SAVE_WALLET: {
      return {
        ...state,
        loading: true,
      };
    }
    case WalletsActionTypes.SAVE_WALLET_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case WalletsActionTypes.SAVE_WALLET_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case WalletsActionTypes.DELETE_WALLET: {
      return {
        ...state,
        loading: true,
      };
    }
    case WalletsActionTypes.DELETE_WALLET_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case WalletsActionTypes.DELETE_WALLET_ERROR: {
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
