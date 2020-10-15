import { getWalletNameFromDepositCall } from '.';
import {
  DepositCallData,
  DepositCallStatus,
} from '../../store/depositCalls/models';
import { Wallets } from '../../store/wallets/models';

describe('DepositCalls', () => {
  describe('getWalletNameFromDepositCall', () => {
    const walletAddress = '12345678';
    const depositCall: DepositCallData = {
      id: '',
      uid: '',
      date: '',
      walletAddress,
      status: DepositCallStatus.PENDING,
    };
    it('returns the wallet name', () => {
      const walletName = 'Cash Stash';
      const wallets: Wallets = {
        1: {
          id: '1',
          name: walletName,
          address: walletAddress,
          dateAdded: '',
        },
      };
      const result = getWalletNameFromDepositCall(wallets, depositCall);
      const expected = walletName;
      expect(result).toEqual(expected);
    });

    it('returns an empty string if the wallet name cannot be found', () => {
      const wallets = {};
      const result = getWalletNameFromDepositCall(wallets, depositCall);
      const expected = '';
      expect(result).toEqual(expected);
    });
  });
});
