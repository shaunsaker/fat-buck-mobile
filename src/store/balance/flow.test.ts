import { expectSaga } from 'redux-saga-test-plan';
import { syncBalanceSuccess } from './actions';
import { onSyncBalanceChannelFlow } from './flow';
import { BalanceData } from './models';

describe('balance flow', () => {
  describe('onSyncBalanceChannelFlow', () => {
    it('puts syncBalanceSuccess with the returned data', () => {
      const balanceData: BalanceData = {
        amount: 1,
        value: 1,
        lastUpdated: '',
      };

      return expectSaga(onSyncBalanceChannelFlow, balanceData)
        .put(syncBalanceSuccess(balanceData))
        .run();
    });
  });
});
