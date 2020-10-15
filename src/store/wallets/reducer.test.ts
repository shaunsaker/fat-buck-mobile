import {
  deleteWallet,
  deleteWalletError,
  deleteWalletSuccess,
  saveWallet,
  saveWalletError,
  saveWalletSuccess,
  setSelectedWalletId,
  syncWallets,
  syncWalletsError,
  syncWalletsSuccess,
} from './actions';
import { WalletData, Wallets } from './models';
import { walletsReducer, initialState } from './reducer';

describe('wallets reducer', () => {
  const wallet: WalletData = {
    id: '1',
    name: '',
    address: '',
    dateAdded: '',
  };

  describe('SYNC_WALLETS', () => {
    it('sets loading to true on SYNC_WALLETS', () => {
      const nextState = walletsReducer(initialState, syncWallets());

      expect(nextState.loading).toEqual(true);
    });

    it('sets state correctly on SYNC_WALLETS_SUCCESS', () => {
      let nextState = walletsReducer(initialState, syncWallets());

      const data: Wallets = {
        1: wallet,
      };
      nextState = walletsReducer(nextState, syncWalletsSuccess(data));

      expect(nextState.loading).toEqual(false);
      expect(nextState.data).toEqual(data);
    });

    it('sets loading to false on SYNC_WALLETS_ERROR', () => {
      let nextState = walletsReducer(initialState, syncWallets());
      nextState = walletsReducer(nextState, syncWalletsError());

      expect(nextState.loading).toEqual(false);
    });
  });

  it('sets the selected wallet id', () => {
    const nextState = walletsReducer(
      initialState,
      setSelectedWalletId(wallet.id),
    );

    expect(nextState.selectedWalletId).toEqual(wallet.id);
  });

  describe('SAVE_WALLET', () => {
    it('sets loading to true on SAVE_WALLET', () => {
      const nextState = walletsReducer(initialState, saveWallet(wallet));

      expect(nextState.loading).toEqual(true);
    });

    it('sets state correctly on SAVE_WALLET_SUCCESS', () => {
      let nextState = walletsReducer(initialState, saveWallet(wallet));
      nextState = walletsReducer(nextState, saveWalletSuccess());

      expect(nextState.loading).toEqual(false);
    });

    it('sets loading to false on SAVE_WALLET_ERROR', () => {
      let nextState = walletsReducer(initialState, saveWallet(wallet));
      nextState = walletsReducer(nextState, saveWalletError());

      expect(nextState.loading).toEqual(false);
    });
  });

  describe('DELETE_WALLET', () => {
    it('sets loading to true on DELETE_WALLET', () => {
      const nextState = walletsReducer(initialState, deleteWallet(wallet.id));

      expect(nextState.loading).toEqual(true);
    });

    it('sets state correctly on DELETE_WALLET_SUCCESS', () => {
      let nextState = walletsReducer(initialState, deleteWallet(wallet.id));
      nextState = walletsReducer(nextState, deleteWalletSuccess());

      expect(nextState.loading).toEqual(false);
    });

    it('sets loading to false on DELETE_WALLET_ERROR', () => {
      let nextState = walletsReducer(initialState, deleteWallet(wallet.id));
      nextState = walletsReducer(nextState, deleteWalletError());

      expect(nextState.loading).toEqual(false);
    });
  });
});
