import { syncTrades, syncTradesError, syncTradesSuccess } from './actions';
import { Trades, TradesState } from './models';
import { tradesReducer, initialState } from './reducer';

describe('trades reducer', () => {
  it('sets loading to true on SYNC_CURRENCY', () => {
    const botId = '1';
    const nextState = tradesReducer(initialState, syncTrades(botId));

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_CURRENCY_SUCCESS', () => {
    const botId = '1';
    let nextState = tradesReducer(initialState, syncTrades(botId));
    const tradeId = '1';
    const trade = {
      id: tradeId,
      botId,
      amount: 0,
      closeProfitAbs: 0,
      closeProfit: 0,
      closeTimestamp: 0,
      currentProfitAbs: 0,
      currentProfit: 0,
      isOpen: true,
      openTimestamp: 0,
      pair: '1',
      sellOrderStatus: '1',
      sellReason: '1',
    };
    const trades: Trades = {
      [tradeId]: trade,
    };
    let expected: TradesState = {
      loading: false,
      data: trades,
    };
    nextState = tradesReducer(nextState, syncTradesSuccess(trades));

    expect(nextState).toEqual(expected);

    // updated trade
    const updatedTrades = {
      ...trades,
    };
    updatedTrades[tradeId].closeProfit = 1;
    expected = {
      loading: false,
      data: updatedTrades,
    };

    nextState = tradesReducer(nextState, syncTradesSuccess(updatedTrades));

    expect(nextState).toEqual(expected);

    // new trade
    const newTradeId = '2';
    const newTrades = {
      ...updatedTrades,
      [newTradeId]: trade,
    };
    expected = {
      loading: false,
      data: newTrades,
    };

    nextState = tradesReducer(nextState, syncTradesSuccess(newTrades));

    expect(nextState).toEqual(expected);
  });

  it('sets loading to false on SYNC_CURRENCY_ERROR', () => {
    const botId = '1';
    let nextState = tradesReducer(initialState, syncTrades(botId));
    nextState = tradesReducer(nextState, syncTradesError());

    expect(nextState.loading).toEqual(false);
  });
});
