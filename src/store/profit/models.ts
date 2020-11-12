export enum ProfitActionTypes {
  SYNC_PROFIT = '@@profit/SYNC_PROFIT',
  SYNC_PROFIT_SUCCESS = '@@profit/SYNC_PROFIT_SUCCESS',
  SYNC_PROFIT_ERROR = '@@profit/SYNC_PROFIT_ERROR',
  SET_PROFIT_TYPE = '@@profit/SET_PROFIT_TYPE',
}

export interface ProfitData {
  ratio: number;
  amount: number;
  lastUpdated: string;
}

export enum ProfitTypes {
  toDate = 'TO DATE',
  annual = 'ANNUAL',
}

export interface ProfitState {
  loading: boolean;
  profitType: ProfitTypes;
  data: ProfitData;
}
