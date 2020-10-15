import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD } from '../constants';

interface TitleTextContainerProps {
  center?: boolean;
}

const TitleTextContainer = styled.Text<TitleTextContainerProps>`
  font-family: ${FONT_BOLD};
  font-size: 24px;
  color: ${colors.white};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  align-self: ${({ center }) => (center ? 'center' : 'auto')};
`;

interface TitleTextProps {
  center?: boolean;
  children: ReactNode;
}

export const TitleText = ({ center, children }: TitleTextProps) => {
  return <TitleTextContainer center={center}>{children}</TitleTextContainer>;
};
