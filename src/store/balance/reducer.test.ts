import {
  setBalanceType,
  syncBalance,
  syncBalanceError,
  syncBalanceSuccess,
} from './actions';
import { BalanceData, BalanceTypes } from './models';
import { balanceReducer, initialState } from './reducer';

describe('balance reducer', () => {
  it('sets loading to true on SYNC_BALANCE', () => {
    const botId = '1';
    const nextState = balanceReducer(initialState, syncBalance(botId));

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_BALANCE_SUCCESS', () => {
    // handles first bot correctly
    const botId = '1';
    let nextState = balanceReducer(initialState, syncBalance(botId));
    const balanceData: BalanceData = {
      total: 1,
      value: 1,
    };
    let expected: Record<string, BalanceData> = {
      [botId]: balanceData,
    };
    nextState = balanceReducer(
      nextState,
      syncBalanceSuccess(botId, balanceData),
    );

    expect(nextState.loading).toEqual(false);
    expect(nextState.data).toEqual(expected);

    // handles update bot correctly
    const updatedBalanceData: BalanceData = {
      total: 2,
      value: 2,
    };
    expected = {
      [botId]: updatedBalanceData,
    };
    nextState = balanceReducer(
      nextState,
      syncBalanceSuccess(botId, updatedBalanceData),
    );

    expect(nextState.data).toEqual(expected);

    // handles new bot correctly
    const newBotId = '2';
    const newBalanceData: BalanceData = balanceData;
    nextState = balanceReducer(
      nextState,
      syncBalanceSuccess(newBotId, newBalanceData),
    );
    expected = {
      ...expected,
      [newBotId]: newBalanceData,
    };

    expect(nextState.data).toEqual(expected);
  });

  it('sets loading to false on SYNC_BALANCE_ERROR', () => {
    const botId = '1';
    let nextState = balanceReducer(initialState, syncBalance(botId));
    nextState = balanceReducer(nextState, syncBalanceError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets balanceType correctly', () => {
    const balanceType = BalanceTypes.zar;
    const nextState = balanceReducer(initialState, setBalanceType(balanceType));

    expect(nextState.balanceType).toEqual(balanceType);
  });
});
