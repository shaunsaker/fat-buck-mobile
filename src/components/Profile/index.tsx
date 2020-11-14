import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../constants';
import { Background } from '../Background';
import { HeaderBar } from '../HeaderBar';
import { PageHeader } from '../PageHeader';
import { TabBar, TabBarProps, useTabBar } from '../TabBar';
import { Settings } from './Settings';
import { Transactions } from './Transactions';
import { Wallets } from './Wallets';

const TABS = ['TRANSACTIONS', 'WALLETS', 'SETTINGS'];

const ProfileContainer = styled.View`
  flex: 1;
  padding-bottom: ${RHYTHM}px;
`;

interface ProfileBaseProps extends TabBarProps {}

const ProfileBase = ({
  tabs,
  selectedTabIndex,
  onTabPress,
}: ProfileBaseProps) => {
  return (
    <Background>
      <HeaderBar showClose />

      <PageHeader>Profile</PageHeader>

      <ProfileContainer>
        {selectedTabIndex === 0 ? (
          <Transactions />
        ) : selectedTabIndex === 1 ? (
          <Wallets />
        ) : (
          <Settings />
        )}
      </ProfileContainer>

      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        onTabPress={onTabPress}
      />
    </Background>
  );
};

interface ProfileProps {}

export const Profile = ({}: ProfileProps) => {
  const { selectedTabIndex, onTabPress } = useTabBar();

  return (
    <ProfileBase
      tabs={TABS}
      selectedTabIndex={selectedTabIndex}
      onTabPress={onTabPress}
    />
  );
};
