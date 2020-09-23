import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { dimensions } from '../dimensions';

const PageHeaderContainer = styled.View`
  align-items: center;
  padding: ${dimensions.rhythm}px;
  margin-bottom: ${dimensions.rhythm}px;
  background-color: ${colors.veryLightTransWhite};
`;

const PageHeaderHeadingText = styled.Text`
  font-size: 24px;
  font-family: 'Recursive-Bold';
  color: ${colors.white};
  text-align: center;
`;

interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <PageHeaderContainer>
      <PageHeaderHeadingText>{children}</PageHeaderHeadingText>
    </PageHeaderContainer>
  );
};
