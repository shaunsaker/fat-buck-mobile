export enum TransactionsActionTypes {
  SYNC_TRANSACTIONS = '@@transactions/SYNC_TRANSACTIONS',
  SYNC_TRANSACTIONS_SUCCESS = '@@transactions/SYNC_TRANSACTIONS_SUCCESS',
  SYNC_TRANSACTIONS_ERROR = '@@transactions/SYNC_TRANSACTIONS_ERROR',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  COMMISSION = 'COMMISSION',
}

export interface BaseTransactionData {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
}

export interface DepositTransactionData extends BaseTransactionData {
  uid: string;
  walletAddress: string;
  depositId: string;
  binanceTransactionId: string;
  date: string;
  amount: number;
}

export type TransactionId = string;

export interface CommissionTransactionData extends BaseTransactionData {
  depositId: string;
  uid: string; // used to filter a users own transactions
}

export type TransactionData =
  | DepositTransactionData
  | CommissionTransactionData; // TODO: or withdrawal etc

export type Transactions = Record<TransactionId, TransactionData>;

export interface TransactionsState {
  loading: boolean;
  data: Transactions;
}
