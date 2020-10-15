import React, { ReactNode } from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD, FONT_REGULAR } from '../constants';

interface ParagraphTextContainerProps {
  center?: boolean;
  bold?: boolean;
}

const ParagraphTextContainer = styled.Text<ParagraphTextContainerProps>`
  font-family: ${({ bold }) => (bold ? FONT_BOLD : FONT_REGULAR)};
  font-size: 14px;
  line-height: 22px;
  color: ${colors.white};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  align-self: ${({ center }) => (center ? 'center' : 'auto')};
`;

interface ParagraphTextProps extends TextProps {
  center?: boolean;
  bold?: boolean;
  children: ReactNode;
}

export const ParagraphText = ({
  center,
  bold,
  children,
  ...props
}: ParagraphTextProps) => {
  return (
    <ParagraphTextContainer center={center} bold={bold} {...props}>
      {children}
    </ParagraphTextContainer>
  );
};
