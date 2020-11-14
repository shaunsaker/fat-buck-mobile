import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD, RHYTHM } from '../constants';
import { selectTransactions } from '../store/transactions/selectors';
import { getTimeSince } from '../utils/getTimeSince';
import { toBTCDigits } from '../utils/toBTCDigits';
import { Column, Row, Table } from './Table';

const COLUMNS: Column[] = [
  {
    label: 'Type',
    style: {
      flex: 0.75,
    },
  },
  { label: 'Date', style: { flex: 1 } },
  {
    label: 'Amount',
    style: {
      flex: 1,
    },
  },
];

const TransactionHistoryContainer = styled.View`
  flex: 1;
`;

interface TransactionHistoryBaseProps {
  rows: Row[];
}

const TransactionHistoryBase = ({ rows }: TransactionHistoryBaseProps) => {
  return (
    <TransactionHistoryContainer>
      <Table
        title="Transaction History"
        columns={COLUMNS}
        rows={rows}
        paddingHorizontal={RHYTHM / 2}
      />
    </TransactionHistoryContainer>
  );
};

interface TransactionHistoryProps {}

export const TransactionHistory = ({}: TransactionHistoryProps) => {
  const transactions = useSelector(selectTransactions);
  const rows: Row[] = transactions.map((transaction) => ({
    id: transaction.id ?? '',
    cells: [
      { label: transaction.type },
      { label: getTimeSince(transaction.date) },
      {
        label: toBTCDigits(transaction.amount).toString(),
        style: {
          fontFamily: FONT_BOLD,
          color: transaction.amount < 0 ? colors.danger : colors.success,
        },
      },
    ],
  }));

  return <TransactionHistoryBase rows={rows} />;
};
