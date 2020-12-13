export enum TradesActionTypes {
  SYNC_TRADES = '@@trades/SYNC_TRADES',
  SYNC_TRADES_SUCCESS = '@@trades/SYNC_TRADES_SUCCESS',
  SYNC_TRADES_ERROR = '@@trades/SYNC_TRADES_ERROR',
  SET_TRADES_SORT_TYPE = '@@trades/SET_TRADES_SORT_BY',
}

export interface TradeData {
  id: string;
  amount: number;
  closeProfitAbs: number;
  closeProfit: number;
  closeRate: number;
  closeTimestamp: number;
  currentProfitAbs: number;
  currentProfit: number;
  isOpen: boolean;
  openRate: number;
  openTimestamp: number;
  pair: string; // e.g. ALGO/BTC
  sellOrderStatus: string;
  sellReason: string;
}

export interface Trade extends TradeData {
  botId: string;
}

export type Trades = Record<string, Trade>;

export enum TradesSortTypes {
  coin = 'coin',
  opened = 'opened',
  closed = 'closed',
  amount = 'amount',
  percent = 'percent',
}

export interface TradesState {
  loading: boolean;
  data: Trades;
  sortType: TradesSortTypes;
  reverseSort: boolean;
}
