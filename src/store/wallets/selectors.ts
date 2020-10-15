import { ApplicationState } from '../reducers';

export const selectSelectedWalletId = (state: ApplicationState) =>
  state.wallets.selectedWalletId;

export const selectWallets = (state: ApplicationState) => state.wallets.data;

export const selectWalletsLoading = (state: ApplicationState) =>
  state.wallets.loading;

export const selectSelectedWallet = (state: ApplicationState) =>
  state.wallets.data[state.wallets.selectedWalletId];
