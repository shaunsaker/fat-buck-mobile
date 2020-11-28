import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { BORDER_WIDTH, FONT_BOLD, FONT_REGULAR, RHYTHM } from '../constants';
import Button, { ButtonKinds } from './Button';
import { navigate } from '../store/navigation/actions';
import { Screens } from '../Router';

const TradesSectionContainer = styled.View`
  flex: 1;
`;

const ShowAlternateViewButtonContainer = styled.View`
  position: absolute;
  top: ${RHYTHM / 2 - 2}px;
  right: ${RHYTHM}px;
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
  isProfit: boolean;
  isLoss: boolean;
  isActive: boolean;
}

interface TradesSectionBaseProps {
  rows: TradeRow[];
  isLoading: boolean;
  onShowGraphPress: () => void;
}

const TradesSectionBase = ({
  rows,
  isLoading,
  onShowGraphPress,
}: TradesSectionBaseProps) => {
  // attach styles
  const rowsWithStyles = rows.map((row) => {
    return {
      ...row,
      style: row.isActive
        ? {
            backgroundColor: colors.lightTransWhite,
            borderTopWidth: BORDER_WIDTH,
            borderBottomWidth: BORDER_WIDTH,
            borderColor: colors.primary,
          }
        : undefined,
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
            fontFamily: isLastLabel ? FONT_BOLD : FONT_REGULAR,
          },
        };
      }),
    };
  });

  return (
    <TradesSectionContainer>
      <Table
        title="Trades"
        columns={COLUMNS}
        rows={rowsWithStyles}
        paddingHorizontal={RHYTHM / 2}>
        {isLoading ? <TableLoader /> : null}
      </Table>

      <ShowAlternateViewButtonContainer>
        <Button
          kind={ButtonKinds.accentFilled}
          small
          onPress={onShowGraphPress}>
          SHOW GRAPH
        </Button>
      </ShowAlternateViewButtonContainer>
    </TradesSectionContainer>
  );
};

interface TradesSectionProps {}

export const TradesSection = ({}: TradesSectionProps) => {
  const dispatch = useDispatch();
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
    isActive: trade.isOpen,
  }));

  const onShowGraphPress = useCallback(() => {
    dispatch(navigate(Screens.tradesGraph));
  }, [dispatch]);

  return (
    <TradesSectionBase
      rows={rows}
      isLoading={isLoading}
      onShowGraphPress={onShowGraphPress}
    />
  );
};
