import { expectSaga } from 'redux-saga-test-plan';
import { syncTradesSuccess } from './actions';
import { onSyncTradesChannelFlow } from './flow';
import { TradeData, Trades } from './models';

describe('trades flow', () => {
  describe('onSyncTradesChannelFlow', () => {
    it('puts syncTradesSuccess with the returned data', () => {
      const botId = '1';
      const tradesData: TradeData[] = [
        {
          id: '1',
          amount: 1,
          closeProfitAbs: 1,
          closeProfit: 1,
          closeTimestamp: 1,
          currentProfitAbs: 1,
          currentProfit: 1,
          isOpen: true,
          openTimestamp: 1,
          pair: '',
          sellOrderStatus: '',
          sellReason: '',
        },
        {
          id: '2',
          amount: 1,
          closeProfitAbs: 1,
          closeProfit: 1,
          closeTimestamp: 1,
          currentProfitAbs: 1,
          currentProfit: 1,
          isOpen: true,
          openTimestamp: 1,
          pair: '',
          sellOrderStatus: '',
          sellReason: '',
        },
      ];
      const newTrades: Trades = {};
      tradesData.forEach((trade) => {
        newTrades[trade.id] = {
          ...trade,
          botId,
        };
      });

      return expectSaga(onSyncTradesChannelFlow, botId, tradesData)
        .put(syncTradesSuccess(newTrades))
        .run();
    });
  });
});
