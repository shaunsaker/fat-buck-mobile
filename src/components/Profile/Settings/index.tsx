import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../../constants';
import { TabBar, TabBarProps, useTabBar } from '../../TabBar';
import { General } from './General';
import { Notifications } from './Notifications';

const TABS = ['GENERAL', 'NOTIFICATIONS'];

const SettingsContainer = styled.View`
  margin-top: -${RHYTHM}px; /* remove default PageHeader margin */
`;

const SettingsContentContainer = styled.View``;

interface SettingsBaseProps extends TabBarProps {}

const SettingsBase = ({
  tabs,
  selectedTabIndex,
  onTabPress,
}: SettingsBaseProps) => {
  return (
    <SettingsContainer>
      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        bottomBorder
        onTabPress={onTabPress}
      />

      <SettingsContentContainer>
        {selectedTabIndex === 0 ? <General /> : <Notifications />}
      </SettingsContentContainer>
    </SettingsContainer>
  );
};

interface SettingsProps {}

export const Settings = ({}: SettingsProps) => {
  const { selectedTabIndex, onTabPress } = useTabBar();

  return (
    <SettingsBase
      tabs={TABS}
      selectedTabIndex={selectedTabIndex}
      onTabPress={onTabPress}
    />
  );
};
