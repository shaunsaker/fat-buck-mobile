import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD, RHYTHM } from '../constants';
import { Column, Row, Table } from './Table';

const COLUMNS: Column[] = [
  {
    label: 'Type',
    style: {
      flex: 1,
    },
  },
  {
    label: 'Amount',
    style: {
      flex: 1,
    },
  },
  {
    label: 'Wallet',
    style: { flex: 1 },
  },
  { label: 'Date', style: { flex: 1 } },
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
  const rows: Row[] = [
    {
      id: '1',
      cells: [
        {
          label: 'Deposit',
        },
        {
          label: '0.001212',
          style: {
            fontFamily: FONT_BOLD,
            color: colors.success,
          },
        },
        {
          label: 'Cash Stash',
        },
        {
          label: '5 seconds ago',
        },
      ],
    },
    {
      id: '2',
      cells: [
        {
          label: 'Commission',
        },
        {
          label: '0.000121',
          style: {
            fontFamily: FONT_BOLD,
            color: colors.danger,
          },
        },
        {
          label: 'Cash Stash',
        },
        {
          label: '25 seconds ago',
        },
      ],
    },
    {
      id: '3',
      cells: [
        {
          label: 'Withdrawal',
        },
        {
          label: '0.001212',
          style: {
            fontFamily: FONT_BOLD,
            color: colors.danger,
          },
        },
        {
          label: 'Cash Stash',
        },
        {
          label: '15 seconds ago',
        },
      ],
    },
    {
      id: '4',
      cells: [
        {
          label: 'Profit Split',
        },
        {
          label: '0.000121',
          style: {
            fontFamily: FONT_BOLD,
            color: colors.success,
          },
        },
        {
          label: 'N/A',
        },
        {
          label: '55 seconds ago',
        },
      ],
    },
  ];

  return <TransactionHistoryBase rows={rows} />;
};
