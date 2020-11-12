import { getDate } from '../../utils/getDate';
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
    const nextState = profitReducer(initialState, syncProfit());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_PROFIT_SUCCESS', () => {
    let nextState = profitReducer(initialState, syncProfit());
    const profitData: ProfitData = {
      ratio: 1,
      amount: 1,
      lastUpdated: getDate(),
    };
    nextState = profitReducer(nextState, syncProfitSuccess(profitData));

    expect(nextState.loading).toEqual(false);
    expect(nextState.data).toEqual(profitData);

    // handles update  correctly
    const updatedProfitData: ProfitData = {
      ratio: 2,
      amount: 2,
      lastUpdated: getDate(),
    };
    nextState = profitReducer(nextState, syncProfitSuccess(updatedProfitData));

    expect(nextState.data).toEqual(updatedProfitData);
  });

  it('sets loading to false on SYNC_PROFIT_ERROR', () => {
    let nextState = profitReducer(initialState, syncProfit());
    nextState = profitReducer(nextState, syncProfitError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets profitType correctly', () => {
    const profitType = ProfitTypes.annual;
    const nextState = profitReducer(initialState, setProfitType(profitType));

    expect(nextState.profitType).toEqual(profitType);
  });
});
