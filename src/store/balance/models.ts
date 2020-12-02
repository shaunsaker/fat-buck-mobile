export enum BalanceActionTypes {
  SYNC_BALANCE = '@@balance/SYNC_BALANCE',
  SYNC_BALANCE_SUCCESS = '@@balance/SYNC_BALANCE_SUCCESS',
  SYNC_BALANCE_ERROR = '@@balance/SYNC_BALANCE_ERROR',
  SET_DISPLAY_BALANCE_AS_BTC = '@@balance/SET_DISPLAY_BALANCE_AS_BTC',
}

export interface BalanceData {
  amount: number;
  value: number; // USD value
  lastUpdated: string;
}

export interface BalanceState {
  loading: boolean;
  displayBalanceAsBTC: boolean;
  data: BalanceData;
}
