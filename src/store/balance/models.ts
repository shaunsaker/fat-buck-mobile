export enum BalanceActionTypes {
  SYNC_BALANCE = '@@balance/SYNC_BALANCE',
  SYNC_BALANCE_SUCCESS = '@@balance/SYNC_BALANCE_SUCCESS',
  SYNC_BALANCE_ERROR = '@@balance/SYNC_BALANCE_ERROR',
  SET_BALANCE_TYPE = '@@balance/SET_BALANCE_TYPE',
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
