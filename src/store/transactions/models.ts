export enum TransactionsActionTypes {
  SYNC_TRANSACTIONS = '@@transactions/SYNC_TRANSACTIONS',
  SYNC_TRANSACTIONS_SUCCESS = '@@transactions/SYNC_TRANSACTIONS_SUCCESS',
  SYNC_TRANSACTIONS_ERROR = '@@transactions/SYNC_TRANSACTIONS_ERROR',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  COMMISSION = 'COMMISSION',
  TRADE = 'TRADE',
}

export interface BaseTransactionData {
  id?: string;
  date: string;
  amount: number;
  type: TransactionType;
}

export interface DepositTransactionData extends BaseTransactionData {
  uid: string;
  walletAddress: string;
  depositCallId: string;
  binanceTransactionId: string;
}

export interface CommissionTransactionData extends BaseTransactionData {
  depositId: string;
  uid: string; // used to filter a users own transactions
}

export interface TradeTransactionData extends BaseTransactionData {
  tradeId: string;
  profitRatio: number;
}

export interface UserTradeTransactionData extends TradeTransactionData {
  transactionId: string;
}

export interface WithdrawalTransactionData extends BaseTransactionData {
  uid: string;
  walletAddress: string;
  withdrawalCallId: string;
  binanceTransactionId: string;
  transactionFee: number;
  resolvedAmount: number;
}

export type TransactionData =
  | DepositTransactionData
  | CommissionTransactionData
  | TradeTransactionData
  | WithdrawalTransactionData;

export interface Transactions {
  [key: string]: TransactionData;
}

export interface TransactionsState {
  data: Transactions;
  loading: boolean;
}
