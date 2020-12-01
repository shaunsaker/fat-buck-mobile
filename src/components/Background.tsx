import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

const BackgroundContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.black};
`;

interface BackgroundProps {
  children?: ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return <BackgroundContainer>{children}</BackgroundContainer>;
};
