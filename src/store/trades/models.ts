export enum TradesActionTypes {
  SYNC_TRADES = '@@trades/SYNC_TRADES',
  SYNC_TRADES_SUCCESS = '@@trades/SYNC_TRADES_SUCCESS',
  SYNC_TRADES_ERROR = '@@trades/SYNC_TRADES_ERROR',
}

export interface TradeData {
  id: string;
  amount: number;
  closeProfitAbs: number;
  closeProfit: number;
  closeTimestamp: number;
  currentProfitAbs: number;
  currentProfit: number;
  isOpen: boolean;
  openTimestamp: number;
  pair: string; // e.g. ALGO/BTC
  sellOrderStatus: string;
  sellReason: string;
}

export interface Trade extends TradeData {
  botId: string;
}

export type Trades = Record<string, Trade>;

export interface TradesState {
  loading: boolean;
  data: Trades;
}
