import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD, RHYTHM } from '../constants';

const TabBarContainer = styled.View`
  flex-direction: row;
`;

interface TabContainerProps {
  isActive: boolean;
  bottomBorder?: boolean;
}

const BORDER_WIDTH = 4;
const TabContainer = styled.TouchableOpacity<TabContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${RHYTHM / 2}px;
  border-color: ${({ isActive }) =>
    isActive ? colors.primary : colors.lightTransWhite};
  border-top-width: ${({ bottomBorder }) =>
    bottomBorder ? 0 : BORDER_WIDTH}px;
  border-bottom-width: ${({ bottomBorder }) =>
    bottomBorder ? BORDER_WIDTH : 0}px;
`;

const TabText = styled.Text`
  font-family: ${FONT_BOLD};
  font-size: 12px;
  color: ${colors.white};
`;

type Tab = string;
export interface TabBarProps {
  tabs: Tab[];
  selectedTabIndex: number;
  bottomBorder?: boolean;
  onTabPress: (tabIndex: number) => void;
}

export const TabBar = ({
  tabs,
  selectedTabIndex,
  bottomBorder,
  onTabPress,
}: TabBarProps) => {
  return (
    <TabBarContainer>
      {tabs.map((tab, index) => (
        <TabContainer
          key={tab}
          isActive={index === selectedTabIndex}
          bottomBorder={bottomBorder}
          onPress={() => onTabPress(index)}>
          <TabText>{tab}</TabText>
        </TabContainer>
      ))}
    </TabBarContainer>
  );
};

export const useTabBar = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const onTabPress = useCallback((tabIndex: number) => {
    setSelectedTabIndex(tabIndex);
  }, []);

  return {
    selectedTabIndex,
    onTabPress,
  };
};
