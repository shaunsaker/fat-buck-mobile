export enum ProfitActionTypes {
  SYNC_PROFIT = '@@profit/SYNC_PROFIT',
  SYNC_PROFIT_SUCCESS = '@@profit/SYNC_PROFIT_SUCCESS',
  SYNC_PROFIT_ERROR = '@@profit/SYNC_PROFIT_ERROR',
  SET_PROFIT_TYPE = '@@profit/SET_PROFIT_TYPE',
}

export interface Profit {
  profitAllPercent: number;
  profitAllFiat: number;
  firstTradeTimestamp: number; // CFO: assumes first trade date was first deposit date
}

export enum ProfitType {
  toDate = 'TO DATE',
  annual = 'ANNUAL',
}

export interface ProfitState extends Profit {
  loading: boolean;
  profitType: ProfitType;
}
