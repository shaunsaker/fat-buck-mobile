import { profitReducer, initialState } from './reducer';
import { syncProfit, syncProfitError } from './actions';

describe('profit reducer', () => {
  it('sets loading to true on SYNC_PROFIT', () => {
    const nextState = profitReducer(initialState, syncProfit());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_PROFIT_SUCCESS', () => {});

  it('sets state correctly on SYNC_PROFIT_ERROR', () => {
    const nextState = profitReducer(initialState, syncProfitError());

    expect(nextState.loading).toEqual(false);
  });
});
