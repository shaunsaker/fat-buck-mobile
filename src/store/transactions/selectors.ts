import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { ApplicationState } from '../reducers';
import { TransactionData } from './models';

export const selectTransactions = (state: ApplicationState) => {
  const transactionsArray = objectToArray<TransactionData>(
    state.transactions.data,
  );
  const sortedTransactionsArray = sortArrayOfObjectsByKey<TransactionData>(
    transactionsArray,
    'date',
    true,
  );

  return sortedTransactionsArray;
};

export const selectTransactionsLoading = (state: ApplicationState) =>
  state.transactions.loading;
