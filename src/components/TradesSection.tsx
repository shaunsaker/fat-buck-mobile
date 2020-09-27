import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { selectTrades, selectTradesLoading } from '../store/trades/selectors';
import {
  getTradeCoin,
  getTradeLoss,
  getTradeProfit,
  getTradeProfitCurrencyValue,
  getTradeProfitPercentage,
} from '../store/trades/utils';
import { getTimeSince } from '../utils/getTimeSince';
import { Table, Column, Row } from './Table';
import { selectBTCPrice } from '../store/balance/selectors';
import { TableLoader } from './TableLoader';

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

interface TradeRow extends Omit<Row, 'cells' | 'style'> {
  labels: string[];
  isProfit?: boolean;
  isLoss?: boolean;
}

interface TradesSectionBaseProps {
  rows: TradeRow[];
  isLoading: boolean;
}

const TradesSectionBase = ({ rows, isLoading }: TradesSectionBaseProps) => {
  // attach styles
  const rowsWithStyles = rows.map((row) => {
    return {
      ...row,
      cells: row.labels.map((label, labelIndex) => {
        const isLastLabel = labelIndex === row.labels.length - 1;

        return {
          label,
          style: {
            color: isLastLabel
              ? row.isProfit
                ? colors.success
                : row.isLoss
                ? colors.danger
                : colors.white
              : colors.white,
            fontFamily: isLastLabel ? 'Recursive-Bold' : 'Recursive-Regular',
          },
        };
      }),
    };
  });

  return (
    <TradesSectionContainer>
      <Table title="Trades" columns={COLUMNS} rows={rowsWithStyles}>
        {isLoading ? <TableLoader /> : null}
      </Table>
    </TradesSectionContainer>
  );
};

interface TradesSectionProps {}

export const TradesSection = ({}: TradesSectionProps) => {
  const trades = useSelector(selectTrades);
  const BTCPrice = useSelector(selectBTCPrice);
  const isLoading = useSelector(selectTradesLoading);
  const rows: TradeRow[] = trades.map((trade) => ({
    id: trade.id,
    labels: [
      getTradeCoin(trade),
      getTimeSince(trade.openTimestamp),
      trade.isOpen ? 'Active' : getTimeSince(trade.closeTimestamp),
      getTradeProfitCurrencyValue(trade, BTCPrice),
      getTradeProfitPercentage(trade),
    ],
    isProfit: getTradeProfit(trade),
    isLoss: getTradeLoss(trade),
  }));

  return <TradesSectionBase rows={rows} isLoading={isLoading} />;
};
