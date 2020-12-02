import { expectSaga } from 'redux-saga-test-plan';
import {
  deleteWallet,
  deleteWalletError,
  deleteWalletSuccess,
  saveWallet,
  saveWalletError,
  saveWalletSuccess,
  setSelectedWalletId,
  syncWalletsSuccess,
} from './actions';
import {
  DELETE_WALLET_SUCCESS_MESSAGE,
  onDeleteWalletFlow,
  onSaveWalletFlow,
  onSyncWalletsChannelFlow,
  SAVE_WALLET_SUCCESS_MESSAGE,
} from './flow';
import { WalletData, Wallets } from './models';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  firestoreDeleteDocument,
  firestoreSaveDocument,
} from '../../services/db';
import { throwError } from 'redux-saga-test-plan/providers';
import { showSnackbar } from '../snackbar/actions';
import rootReducer, { initialState } from '../reducers';
import { navigateBack } from '../navigation/actions';

describe('wallets flow', () => {
  describe('onSyncWalletsChannelFlow', () => {
    it('puts syncWalletsSuccess with the returned data', () => {
      const wallet = {
        id: '1',
        name: '',
        address: '',
        dateAdded: '',
      };
      const dataArray: WalletData[] = [
        {
          id: '1',
          name: '',
          address: '',
          dateAdded: '',
        },
      ];
      const data: Wallets = {
        1: wallet,
      };

      return expectSaga(onSyncWalletsChannelFlow, dataArray)
        .put(syncWalletsSuccess(data))
        .run();
    });
  });

  describe('onSaveWalletFlow', () => {
    const wallet: WalletData = {
      id: '1',
      name: '',
      address: '',
      dateAdded: '',
    };

    it('saves the wallet', () => {
      return expectSaga(onSaveWalletFlow, saveWallet(wallet))
        .withState(initialState)
        .provide([[matchers.call.fn(firestoreSaveDocument), undefined]])
        .put(saveWalletSuccess())
        .put(navigateBack())
        .put(showSnackbar(SAVE_WALLET_SUCCESS_MESSAGE))
        .run();
    });

    it('handles errors', () => {
      const errorMessage = 'Test';

      return expectSaga(onSaveWalletFlow, saveWallet(wallet))
        .withState(initialState)
        .provide([
          [
            matchers.call.fn(firestoreSaveDocument),
            throwError(new Error(errorMessage)),
          ],
        ])
        .put(saveWalletError())
        .put(showSnackbar(errorMessage))
        .run();
    });
  });

  describe('onDeleteWalletFlow', () => {
    const walletId = '1';

    it('deletes the wallet', () => {
      return expectSaga(onDeleteWalletFlow, deleteWallet(walletId))
        .withState(initialState)
        .provide([[matchers.call.fn(firestoreDeleteDocument), undefined]])
        .put(deleteWalletSuccess())
        .put(navigateBack())
        .put(showSnackbar(DELETE_WALLET_SUCCESS_MESSAGE))
        .run();
    });

    it('resets the selected wallet id', () => {
      const state = rootReducer(initialState, setSelectedWalletId(walletId));
      return expectSaga(onDeleteWalletFlow, deleteWallet(walletId))
        .withState(state)
        .provide([[matchers.call.fn(firestoreDeleteDocument), undefined]])
        .put(setSelectedWalletId(''))
        .put(deleteWalletSuccess())
        .put(navigateBack())
        .put(showSnackbar(DELETE_WALLET_SUCCESS_MESSAGE))
        .run();
    });

    it('handles errors', () => {
      const errorMessage = 'Test';

      return expectSaga(onDeleteWalletFlow, deleteWallet(walletId))
        .withState(initialState)
        .provide([
          [
            matchers.call.fn(firestoreDeleteDocument),
            throwError(new Error(errorMessage)),
          ],
        ])
        .put(deleteWalletError())
        .put(showSnackbar(errorMessage))
        .run();
    });
  });
});
