import { expectSaga } from 'redux-saga-test-plan';
import { syncBalanceSuccess } from './actions';
import { onSyncBalanceChannelFlow } from './flow';
import { BalanceData } from './models';

describe('balance flow', () => {
  describe('onSyncBalanceChannelFlow', () => {
    it('puts syncBalanceSuccess with the returned data', () => {
      const botId = '1';
      const balanceData: BalanceData = {
        total: 1,
        value: 1,
      };

      return expectSaga(onSyncBalanceChannelFlow, botId, balanceData)
        .put(syncBalanceSuccess(botId, balanceData))
        .run();
    });
  });
});
