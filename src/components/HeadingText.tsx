import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD } from '../constants';

interface HeadingTextContainerProps {
  center?: boolean;
}

const HeadingTextContainer = styled.Text<HeadingTextContainerProps>`
  font-family: ${FONT_BOLD};
  font-size: 16px;
  color: ${colors.white};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  align-self: ${({ center }) => (center ? 'center' : 'auto')};
`;

interface HeadingTextProps {
  center?: boolean;
  children: ReactNode;
}

export const HeadingText = ({ center, children }: HeadingTextProps) => {
  return (
    <HeadingTextContainer center={center}>{children}</HeadingTextContainer>
  );
};
