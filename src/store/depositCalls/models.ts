export enum DepositCallsActionTypes {
  SYNC_DEPOSIT_CALLS = '@@depositCalls/SYNC_DEPOSIT_CALLS',
  SYNC_DEPOSIT_CALLS_SUCCESS = '@@depositCalls/SYNC_DEPOSIT_CALLS_SUCCESS',
  SYNC_DEPOSIT_CALLS_ERROR = '@@depositCalls/SYNC_DEPOSIT_CALLS_ERROR',
  CREATE_DEPOSIT_CALL = '@@depositCalls/CREATE_DEPOSIT_CALL',
  CREATE_DEPOSIT_CALL_SUCCESS = '@@depositCalls/CREATE_DEPOSIT_CALL_SUCCESS',
  CREATE_DEPOSIT_CALL_ERROR = '@@depositCalls/CREATE_DEPOSIT_CALL_ERROR',
}

export type DepositCallId = string;

export enum DepositCallStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export interface DepositCallData {
  id: string;
  uid: string;
  date: string;
  walletAddress: string;
  status: DepositCallStatus;
  binanceTransactionId?: string; // added once it has been seen in deposit history
  resolvedDate?: string; // added once it has resolved (status is SUCCESS)
  message?: string; // used for errors
}

export type DepositCalls = Record<DepositCallId, DepositCallData>;

export interface DepositCallsState {
  loading: boolean;
  data: DepositCalls;
}
