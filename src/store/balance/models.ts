export enum BalanceActionTypes {
  SYNC_BALANCE = '@@balance/SYNC_BALANCE',
  SYNC_BALANCE_SUCCESS = '@@balance/SYNC_BALANCE_SUCCESS',
  SYNC_BALANCE_ERROR = '@@balance/SYNC_BALANCE_ERROR',
  SET_BALANCE_TYPE = '@@balance/SET_BALANCE_TYPE',
}

export interface BalanceData {
  amount: number;
  value: number; // USD value
  lastUpdated: string;
}

export enum BalanceTypes {
  btc = 'BTC',
  zar = 'ZAR',
}

export interface BalanceState {
  loading: boolean;
  balanceType: BalanceTypes;
  data: BalanceData;
}
