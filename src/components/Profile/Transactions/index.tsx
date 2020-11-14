import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../../constants';
import { TabBar, TabBarProps, useTabBar } from '../../TabBar';
import { All } from './All';
import { Deposits } from './Deposits';
import { Withdrawals } from './Withdrawals';

const TABS = ['ALL', 'DEPOSITS', 'WITHDRAWALS'];

const TransactionsContainer = styled.View`
  flex: 1;
  margin-top: -${RHYTHM}px; /* remove default PageHeader margin */
`;

const TransactionsContentContainer = styled.View`
  flex: 1;
`;

interface TransactionsBaseProps extends TabBarProps {}

const TransactionsBase = ({
  tabs,
  selectedTabIndex,
  onTabPress,
}: TransactionsBaseProps) => {
  return (
    <TransactionsContainer>
      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        bottomBorder
        onTabPress={onTabPress}
      />

      <TransactionsContentContainer>
        {selectedTabIndex === 0 ? (
          <All />
        ) : selectedTabIndex === 1 ? (
          <Deposits />
        ) : (
          <Withdrawals />
        )}
      </TransactionsContentContainer>
    </TransactionsContainer>
  );
};

interface TransactionsProps {}

export const Transactions = ({}: TransactionsProps) => {
  const { selectedTabIndex, onTabPress } = useTabBar();

  return (
    <TransactionsBase
      tabs={TABS}
      selectedTabIndex={selectedTabIndex}
      onTabPress={onTabPress}
    />
  );
};
