import { action } from 'typesafe-actions';

import { Transactions, TransactionsActionTypes } from './models';

export const syncTransactions = () =>
  action(TransactionsActionTypes.SYNC_TRANSACTIONS);

export const syncTransactionsSuccess = (transactions: Transactions) =>
  action(TransactionsActionTypes.SYNC_TRANSACTIONS_SUCCESS, {
    transactions,
  });

export const syncTransactionsError = () =>
  action(TransactionsActionTypes.SYNC_TRANSACTIONS_ERROR);
