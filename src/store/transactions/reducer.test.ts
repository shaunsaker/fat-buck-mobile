import {
  syncTransactions,
  syncTransactionsError,
  syncTransactionsSuccess,
} from './actions';
import { Transactions, TransactionType } from './models';
import { transactionsReducer, initialState } from './reducer';

describe('transactions reducer', () => {
  it('sets loading to true on SYNC_TRANSACTIONS', () => {
    const nextState = transactionsReducer(initialState, syncTransactions());

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SYNC_TRANSACTIONS_SUCCESS', () => {
    let nextState = transactionsReducer(initialState, syncTransactions());

    const data: Transactions = {
      1: {
        id: '1',
        date: '',
        amount: 1000,
        type: TransactionType.COMMISSION,
        depositId: '1',
        uid: '1',
      },
    };
    nextState = transactionsReducer(nextState, syncTransactionsSuccess(data));

    expect(nextState.loading).toEqual(false);
    expect(nextState.data).toEqual(data);
  });

  it('sets loading to false on SYNC_TRANSACTIONS_ERROR', () => {
    let nextState = transactionsReducer(initialState, syncTransactions());
    nextState = transactionsReducer(nextState, syncTransactionsError());

    expect(nextState.loading).toEqual(false);
  });
});
