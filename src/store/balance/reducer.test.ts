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
    const nextState = balanceReducer(initialState, syncBalance());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_BALANCE_SUCCESS', () => {
    // handles first bot correctly
    let nextState = balanceReducer(initialState, syncBalance());
    const balanceData: BalanceData = {
      amount: 1,
      value: 1,
      lastUpdated: '',
    };
    nextState = balanceReducer(nextState, syncBalanceSuccess(balanceData));

    expect(nextState.loading).toEqual(false);
    expect(nextState.data).toEqual(balanceData);

    // handles update correctly
    const updatedBalanceData: BalanceData = {
      amount: 2,
      value: 2,
      lastUpdated: '',
    };
    nextState = balanceReducer(
      nextState,
      syncBalanceSuccess(updatedBalanceData),
    );

    expect(nextState.data).toEqual(updatedBalanceData);
  });

  it('sets loading to false on SYNC_BALANCE_ERROR', () => {
    let nextState = balanceReducer(initialState, syncBalance());
    nextState = balanceReducer(nextState, syncBalanceError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets balanceType correctly', () => {
    const balanceType = BalanceTypes.zar;
    const nextState = balanceReducer(initialState, setBalanceType(balanceType));

    expect(nextState.balanceType).toEqual(balanceType);
  });
});
