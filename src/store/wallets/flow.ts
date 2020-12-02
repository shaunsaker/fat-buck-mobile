import { SagaIterator } from 'redux-saga';
import {
  fork,
  put,
  call,
  takeEvery,
  takeLatest,
  take,
} from 'redux-saga/effects';
import {
  createFirestoreSyncChannel,
  firestoreDeleteDocument,
  firestoreSaveDocument,
} from '../../services/db';
import { showSnackbar } from '../actions';
import firestore from '@react-native-firebase/firestore';
import { WalletData, WalletsActionTypes, WalletId } from './models';
import {
  saveWallet,
  saveWalletSuccess,
  saveWalletError,
  syncWallets,
  syncWalletsSuccess,
  deleteWallet,
  deleteWalletSuccess,
  deleteWalletError,
  setSelectedWalletId,
} from './actions';
import { AuthActionTypes } from '../auth/models';
import { select } from '../../utils/typedSelect';
import { selectUserUid } from '../user/selectors';
import { ActionType } from 'typesafe-actions';
import { navigateBack } from '../navigation/actions';
import { selectSelectedWalletId } from './selectors';

export function* onSyncWalletsChannelFlow(data: WalletData[]) {
  const newData: Record<WalletId, WalletData> = {};
  data.forEach((wallet) => {
    newData[wallet.id] = wallet;
  });

  yield put(syncWalletsSuccess(newData));
}

export function* onSyncWalletsFlow(): SagaIterator {
  try {
    const userId = (yield* select(selectUserUid)) as string; // it is definitely defined at this point
    const ref = firestore()
      .collection('users')
      .doc(userId)
      .collection('wallets');
    const channel = yield call(createFirestoreSyncChannel, ref);

    yield takeEvery(channel, onSyncWalletsChannelFlow);

    // TODO: this isn't working entirely, still getting firestore permission errors
    yield take(AuthActionTypes.SIGN_OUT_SUCCESS);
    channel.close();
  } catch (error) {
    yield put(showSnackbar(error.message));
  }
}

export function* watchSyncWalletsFlow(): SagaIterator {
  yield takeLatest(WalletsActionTypes.SYNC_WALLETS, onSyncWalletsFlow);
}

export function* syncWalletsFlow(): SagaIterator {
  yield put(syncWallets());
}

export const SAVE_WALLET_SUCCESS_MESSAGE = 'Wallet saved successfully.';

export function* onSaveWalletFlow(
  action: ActionType<typeof saveWallet>,
): SagaIterator {
  try {
    const userId = (yield* select(selectUserUid)) as string; // it is definitely defined at this point
    const ref = firestore()
      .collection('users')
      .doc(userId)
      .collection('wallets')
      .doc(action.payload.wallet.id);
    yield call(firestoreSaveDocument, ref, action.payload.wallet);
    yield put(saveWalletSuccess());
    yield put(navigateBack());
    yield put(showSnackbar(SAVE_WALLET_SUCCESS_MESSAGE));
  } catch (error) {
    yield put(saveWalletError());
    yield put(showSnackbar(error.message));
  }
}

export function* watchSaveWalletFlow(): SagaIterator {
  yield takeLatest(WalletsActionTypes.SAVE_WALLET, onSaveWalletFlow);
}

export const DELETE_WALLET_SUCCESS_MESSAGE = 'Wallet deleted successfully.';

export function* onDeleteWalletFlow(
  action: ActionType<typeof deleteWallet>,
): SagaIterator {
  try {
    const userId = (yield* select(selectUserUid)) as string; // it is definitely defined at this point
    const ref = firestore()
      .collection('users')
      .doc(userId)
      .collection('wallets')
      .doc(action.payload.walletId);
    yield call(firestoreDeleteDocument, ref);

    // if the wallet is currently selected, deselect it
    const selectedWalletId = yield* select(selectSelectedWalletId);
    if (selectedWalletId === action.payload.walletId) {
      yield put(setSelectedWalletId(''));
    }

    yield put(deleteWalletSuccess());

    yield put(navigateBack());
    yield put(showSnackbar(DELETE_WALLET_SUCCESS_MESSAGE));
  } catch (error) {
    yield put(deleteWalletError());
    yield put(showSnackbar(error.message));
  }
}

export function* watchDeleteWalletFlow(): SagaIterator {
  yield takeLatest(WalletsActionTypes.DELETE_WALLET, onDeleteWalletFlow);
}

export function* walletsFlow(): SagaIterator {
  yield fork(watchSyncWalletsFlow);
  yield fork(syncWalletsFlow);
  yield fork(watchSaveWalletFlow);
  yield fork(watchDeleteWalletFlow);
}
