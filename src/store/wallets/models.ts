export enum WalletsActionTypes {
  SYNC_WALLETS = '@@wallets/SYNC_WALLETS',
  SYNC_WALLETS_SUCCESS = '@@wallets/SYNC_WALLETS_SUCCESS',
  SYNC_WALLETS_ERROR = '@@wallets/SYNC_WALLETS_ERROR',
  SET_SELECTED_WALLET_ID = '@@wallets/SET_SELECTED_WALLET_ID',
  SAVE_WALLET = '@@wallets/SAVE_WALLET',
  SAVE_WALLET_SUCCESS = '@@wallets/SAVE_WALLET_SUCCESS',
  SAVE_WALLET_ERROR = '@@wallets/SAVE_WALLET_ERROR',
  DELETE_WALLET = '@@wallets/DELETE_WALLET',
  DELETE_WALLET_SUCCESS = '@@wallets/DELETE_WALLET_SUCCESS',
  DELETE_WALLET_ERROR = '@@wallets/DELETE_WALLET_ERROR',
}

export type WalletId = string;

export interface WalletData {
  id: WalletId;
  name: string;
  address: string;
  dateAdded: string;
}

export type Wallets = Record<WalletId, WalletData>;

export interface WalletsState {
  loading: boolean;
  selectedWalletId: WalletId;
  data: Wallets;
}
