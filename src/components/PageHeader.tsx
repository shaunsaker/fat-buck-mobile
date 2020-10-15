import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { RHYTHM } from '../constants';
import { TitleText } from './TitleText';

const PageHeaderContainer = styled.View`
  align-items: center;
  padding: ${RHYTHM}px;
  margin-bottom: ${RHYTHM}px;
  background-color: ${colors.veryLightTransWhite};
`;

interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <PageHeaderContainer>
      <TitleText center>{children}</TitleText>
    </PageHeaderContainer>
  );
};
