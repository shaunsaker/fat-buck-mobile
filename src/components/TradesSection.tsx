import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import {
  selectTrades,
  selectTradesLoading,
  selectTradesReverseSort,
  selectTradesSortType,
} from '../store/trades/selectors';
import {
  getTradeCoin,
  getTradeLoss,
  getTradeProfit,
  getTradeProfitCurrencyValue,
  getTradeProfitPercentage,
} from '../store/trades/utils';
import { getTimeSince } from '../utils/getTimeSince';
import { Table, Column, Row, Cell } from './Table';
import { selectBTCPrice } from '../store/balance/selectors';
import { TableLoader } from './TableLoader';
import { FONT_BOLD, FONT_REGULAR, RHYTHM } from '../constants';
import Button, { ButtonKinds } from './Button';
import { navigate } from '../store/navigation/actions';
import { Screens } from '../Router';
import { TradesSortTypes } from '../store/trades/models';
import { setTradesSortBy } from '../store/actions';

const TradesSectionContainer = styled.View`
  flex: 1;
`;

const WinLossContainer = styled.View`
  position: absolute;
  top: 13px;
  left: ${RHYTHM}px;
  flex-direction: row;
`;

interface WinLossTextProps {
  isWin?: boolean;
  isLoss?: boolean;
}

const WinLossText = styled.Text<WinLossTextProps>`
  font-size: 12px;
  font-family: ${FONT_BOLD};
  color: ${({ isWin, isLoss }) =>
    isWin ? colors.success : isLoss ? colors.danger : colors.white};
`;

const ShowAlternateViewButtonContainer = styled.View`
  position: absolute;
  top: ${RHYTHM / 2 - 2}px;
  right: ${RHYTHM}px;
`;

const COLUMNS: Column[] = [
  {
    key: TradesSortTypes.coin,
    label: 'Coin',
    style: {
      flex: 0.75,
      textAlign: 'left',
    },
  },
  {
    key: TradesSortTypes.opened,
    label: 'Opened',
    style: {
      flex: 1.5,
      textAlign: 'center',
    },
  },
  {
    key: TradesSortTypes.closed,
    label: 'Closed',
    style: {
      flex: 1.5,
      textAlign: 'center',
    },
  },
  {
    key: TradesSortTypes.amount,
    label: 'Amount',
    style: {
      flex: 1,
      textAlign: 'center',
    },
  },
  {
    key: TradesSortTypes.percent,
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
  wins: number;
  losses: number;
  sortByKey: string;
  reverseSort: boolean;
  isLoading: boolean;
  onShowGraphPress: () => void;
  onTableHeaderPress: (key: string) => void;
}

const TradesSectionBase = ({
  rows,
  wins,
  losses,
  sortByKey,
  reverseSort,
  isLoading,
  onShowGraphPress,
  onTableHeaderPress,
}: TradesSectionBaseProps) => {
  // attach styles
  const rowsWithStyles = rows.map((row) => {
    return {
      ...row,
      style: row.isActive
        ? {
            backgroundColor: colors.lightTransWhite,
          }
        : undefined,
      cells: row.labels.map((label, labelIndex) => {
        const isLastLabel = labelIndex === row.labels.length - 1;
        const cell: Cell = {
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

        return cell;
      }),
    };
  });

  return (
    <TradesSectionContainer>
      <WinLossContainer>
        <WinLossText>W: </WinLossText>

        <WinLossText isWin>{wins}</WinLossText>

        <WinLossText> L: </WinLossText>

        <WinLossText isLoss>{losses}</WinLossText>
      </WinLossContainer>

      <Table
        title="Trades"
        columns={COLUMNS}
        rows={rowsWithStyles}
        paddingHorizontal={RHYTHM / 2}
        sortByKey={sortByKey}
        reverseSort={reverseSort}
        onTableHeaderPress={onTableHeaderPress}>
        {isLoading ? <TableLoader /> : null}
      </Table>

      <ShowAlternateViewButtonContainer>
        <Button kind={ButtonKinds.primary} small onPress={onShowGraphPress}>
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
  const wins = trades.filter((trade) => trade.closeProfitAbs >= 0).length;
  const losses = trades.filter((trade) => trade.closeProfitAbs < 0).length;
  const sortByKey = useSelector(selectTradesSortType);
  const reverseSort = useSelector(selectTradesReverseSort);

  const onShowGraphPress = useCallback(() => {
    dispatch(navigate(Screens.tradesGraph));
  }, [dispatch]);

  const onTableHeaderPress = useCallback(
    (key: string) => {
      const sortBy = key as TradesSortTypes;

      dispatch(setTradesSortBy(sortBy));
    },
    [dispatch],
  );

  return (
    <TradesSectionBase
      rows={rows}
      wins={wins}
      losses={losses}
      sortByKey={sortByKey}
      reverseSort={reverseSort}
      isLoading={isLoading}
      onShowGraphPress={onShowGraphPress}
      onTableHeaderPress={onTableHeaderPress}
    />
  );
};
