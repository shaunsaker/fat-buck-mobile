import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { Table, Column, Row } from './Table';

const TradesSectionContainer = styled.View``;

const COLUMNS: Column[] = [
  {
    label: 'Coin',
    style: {
      flex: 1,
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

interface TradesSectionBaseProps {
  rows: Row[];
}

const TradesSectionBase = ({ rows }: TradesSectionBaseProps) => {
  return (
    <TradesSectionContainer>
      <Table title="Trades" columns={COLUMNS} rows={rows} />
    </TradesSectionContainer>
  );
};

interface TradesSectionProps {}

export const TradesSection = ({}: TradesSectionProps) => {
  const rows: Row[] = [
    {
      id: '1',
      labels: ['LTC', ' 10 min ago', 'Active', '52.11', '1.35'],
      style: { backgroundColor: colors.lightSuccess }, // active profit
    },
    {
      id: '2',
      labels: ['IOTA', ' 3 hrs ago', 'Active', '52.11', '-1.35'],
      style: { backgroundColor: colors.lightDanger }, // active loss
    },
    { id: '3', labels: ['BCH', ' 1 day ago', '1 day ago', '52.11', '1.35'] },
    { id: '4', labels: ['NEO', ' 2 days ago', '2 days ago', '52.11', '1.35'] },
  ];
  return <TradesSectionBase rows={rows} />;
};
