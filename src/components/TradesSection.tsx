import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { selectTrades } from '../store/trades/selectors';
import {
  getTradeCoin,
  getTradeLoss,
  getTradeProfit,
  getTradeProfitCurrencyValue,
  getTradeProfitPercentage,
} from '../store/trades/utils';
import { getTimeSince } from '../utils/getTimeSince';
import { Table, Column, Row } from './Table';

const TradesSectionContainer = styled.View`
  flex: 1;
`;

const COLUMNS: Column[] = [
  {
    label: 'Coin',
    style: {
      flex: 0.75,
      textAlign: 'left',
    },
  },
  {
    label: 'Opened',
    style: {
      flex: 1.5,
      textAlign: 'center',
    },
  },
  {
    label: 'Closed',
    style: {
      flex: 1.5,
      textAlign: 'center',
    },
  },
  {
    label: 'Amount',
    style: {
      flex: 1,
      textAlign: 'center',
    },
  },
  {
    label: 'Profit %',
    style: {
      flex: 1,
      textAlign: 'right',
    },
  },
];

interface TradeRow extends Omit<Row, 'style'> {
  isProfit?: boolean;
  isLoss?: boolean;
}

interface TradesSectionBaseProps {
  rows: TradeRow[];
}

const TradesSectionBase = ({ rows }: TradesSectionBaseProps) => {
  // attach styles
  const rowsWithStyles = rows.map((row) => ({
    ...row,
    style: {
      backgroundColor: row.isProfit
        ? colors.lightSuccess
        : row.isLoss
        ? colors.lightDanger
        : undefined,
    },
  }));

  return (
    <TradesSectionContainer>
      <Table title="Trades" columns={COLUMNS} rows={rowsWithStyles} />
    </TradesSectionContainer>
  );
};

interface TradesSectionProps {}

export const TradesSection = ({}: TradesSectionProps) => {
  const trades = useSelector(selectTrades);
  const rows: TradeRow[] = trades.map((trade) => ({
    id: trade.id,
    labels: [
      getTradeCoin(trade),
      getTimeSince(trade.openTimestamp),
      trade.isOpen ? 'Active' : getTimeSince(trade.closeTimestamp),
      getTradeProfitCurrencyValue(trade, 170000), // TODO: get BTC currency value
      getTradeProfitPercentage(trade),
    ],
    isProfit: getTradeProfit(trade),
    isLoss: getTradeLoss(trade),
  }));

  return <TradesSectionBase rows={rows} />;
};
