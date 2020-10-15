import { expectSaga } from 'redux-saga-test-plan';
import { syncTransactionsSuccess } from './actions';
import { onSyncTransactionsChannelFlow } from './flow';
import { TransactionData, Transactions } from './models';

describe('transactions flow', () => {
  describe('onSyncTransactionsChannelFlow', () => {
    it('puts syncTransactionsSuccess with the returned data', () => {
      const dataArray: TransactionData[] = [];
      const data: Transactions = {};

      return expectSaga(onSyncTransactionsChannelFlow, dataArray)
        .put(syncTransactionsSuccess(data))
        .run();
    });
  });
});
