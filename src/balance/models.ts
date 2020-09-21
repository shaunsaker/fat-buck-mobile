export enum BalanceActionTypes {
  SYNC_BALANCE = '@@profit/SYNC_BALANCE',
  SYNC_BALANCE_SUCCESS = '@@profit/SYNC_BALANCE_SUCCESS',
  SYNC_BALANCE_ERROR = '@@profit/SYNC_BALANCE_ERROR',
  SET_BALANCE_TYPE = '@@profit/SET_BALANCE_TYPE',
}

export interface Balance {
  total: number;
  value: number;
}

export enum BalanceType {
  btc = 'BTC',
  zar = 'ZAR',
}

export interface BalanceState extends Balance {
  loading: boolean;
  balanceType: BalanceType;
}
