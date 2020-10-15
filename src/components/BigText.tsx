import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD } from '../constants';

const BigTextContainer = styled.Text`
  font-family: ${FONT_BOLD};
  font-size: 48px;
  color: ${colors.white};
`;

interface BigTextProps {
  children: ReactNode;
}

export const BigText = ({ children }: BigTextProps) => {
  return <BigTextContainer>{children}</BigTextContainer>;
};
