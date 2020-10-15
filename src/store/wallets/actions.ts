import { action } from 'typesafe-actions';

import { WalletData, WalletId, Wallets, WalletsActionTypes } from './models';

export const syncWallets = () => action(WalletsActionTypes.SYNC_WALLETS);

export const syncWalletsSuccess = (wallets: Wallets) =>
  action(WalletsActionTypes.SYNC_WALLETS_SUCCESS, {
    wallets,
  });

export const syncWalletsError = () =>
  action(WalletsActionTypes.SYNC_WALLETS_ERROR);

export const setSelectedWalletId = (walletId: WalletId) =>
  action(WalletsActionTypes.SET_SELECTED_WALLET_ID, {
    walletId,
  });

export const saveWallet = (wallet: WalletData) =>
  action(WalletsActionTypes.SAVE_WALLET, {
    wallet,
  });

export const saveWalletSuccess = () =>
  action(WalletsActionTypes.SAVE_WALLET_SUCCESS);

export const saveWalletError = () =>
  action(WalletsActionTypes.SAVE_WALLET_ERROR);

export const deleteWallet = (walletId: WalletId) =>
  action(WalletsActionTypes.DELETE_WALLET, {
    walletId,
  });

export const deleteWalletSuccess = () =>
  action(WalletsActionTypes.DELETE_WALLET_SUCCESS);

export const deleteWalletError = () =>
  action(WalletsActionTypes.DELETE_WALLET_ERROR);
