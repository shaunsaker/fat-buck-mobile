import { expectSaga } from 'redux-saga-test-plan';
import { syncProfitSuccess } from './actions';
import { onSyncProfitChannelFlow } from './flow';
import { ProfitData } from './models';

describe('profit flow', () => {
  describe('onSyncProfitChannelFlow', () => {
    it('puts syncProfitSuccess with the returned data', () => {
      const profitData: ProfitData = {
        ratio: 1,
        amount: 1,
        lastUpdated: '',
      };

      return expectSaga(onSyncProfitChannelFlow, profitData)
        .put(syncProfitSuccess(profitData))
        .run();
    });
  });
});
