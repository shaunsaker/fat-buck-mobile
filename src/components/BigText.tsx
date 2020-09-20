import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

const BigTextContainer = styled.Text`
  font-family: 'Recursive-Bold';
  font-size: 48px;
  color: ${colors.white};
`;

interface BigTextProps {
  children: ReactNode;
}

export const BigText = ({ children }: BigTextProps) => {
  return <BigTextContainer>{children}</BigTextContainer>;
};
