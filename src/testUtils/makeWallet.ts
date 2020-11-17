import { WalletData } from '../store/wallets/models';
import { getDate } from '../utils/getDate';
import { getUniqueId } from '../utils/getUniqueId';

export const makeWallet = (): WalletData => ({
  id: getUniqueId(),
  name: getUniqueId(),
  address: getUniqueId(),
  dateAdded: getDate(),
});
