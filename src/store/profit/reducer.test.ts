import {
  setProfitType,
  syncProfit,
  syncProfitError,
  syncProfitSuccess,
} from './actions';
import { ProfitData, ProfitTypes } from './models';
import { profitReducer, initialState } from './reducer';

describe('profit reducer', () => {
  it('sets loading to true on SYNC_PROFIT', () => {
    const botId = '1';
    const nextState = profitReducer(initialState, syncProfit(botId));

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_PROFIT_SUCCESS', () => {
    // handles first bot correctly
    const botId = '1';
    let nextState = profitReducer(initialState, syncProfit(botId));
    const profitData: ProfitData = {
      profitAllPercent: 60,
      profitAllFiat: 1200,
      firstTradeTimestamp: Date.now(),
    };
    let expected: Record<string, ProfitData> = {
      [botId]: profitData,
    };
    nextState = profitReducer(nextState, syncProfitSuccess(botId, profitData));

    expect(nextState.loading).toEqual(false);
    expect(nextState.data).toEqual(expected);

    // handles update bot correctly
    const updatedProfitData: ProfitData = {
      profitAllPercent: 65,
      profitAllFiat: 1300,
      firstTradeTimestamp: Date.now() + 10,
    };
    expected = {
      [botId]: updatedProfitData,
    };
    nextState = profitReducer(
      nextState,
      syncProfitSuccess(botId, updatedProfitData),
    );

    expect(nextState.data).toEqual(expected);

    // handles new bot correctly
    const newBotId = '2';
    const newBotData: ProfitData = profitData;
    nextState = profitReducer(
      nextState,
      syncProfitSuccess(newBotId, newBotData),
    );
    expected = {
      ...expected,
      [newBotId]: newBotData,
    };

    expect(nextState.data).toEqual(expected);
  });

  it('sets loading to false on SYNC_PROFIT_ERROR', () => {
    const botId = '1';
    let nextState = profitReducer(initialState, syncProfit(botId));
    nextState = profitReducer(nextState, syncProfitError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets profitType correctly', () => {
    const profitType = ProfitTypes.annual;
    const nextState = profitReducer(initialState, setProfitType(profitType));

    expect(nextState.profitType).toEqual(profitType);
  });
});
