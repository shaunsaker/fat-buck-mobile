import { expectSaga } from 'redux-saga-test-plan';
import { syncProfitSuccess } from './actions';
import { onSyncProfitChannelFlow } from './flow';
import { ProfitData } from './models';

describe('profit flow', () => {
  describe('onSyncProfitChannelFlow', () => {
    it('puts syncProfitSuccess with the returned data', () => {
      const botId = '1';
      const profitData: ProfitData = {
        profitAllPercent: 1,
        profitAllFiat: 1,
        firstTradeTimestamp: 1,
      };

      return expectSaga(onSyncProfitChannelFlow, botId, profitData)
        .put(syncProfitSuccess(botId, profitData))
        .run();
    });
  });
});
