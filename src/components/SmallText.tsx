import React, { ReactNode } from 'react';
import { StyleProp, TextProps, TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD, FONT_REGULAR } from '../constants';

interface SmallTextContainerProps {
  center?: boolean;
  bold?: boolean;
}

const SmallTextContainer = styled.Text<SmallTextContainerProps>`
  font-family: ${({ bold }) => (bold ? FONT_BOLD : FONT_REGULAR)};
  font-size: 12px;
  color: ${colors.white};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  align-self: ${({ center }) => (center ? 'center' : 'auto')};
`;

interface SmallTextProps extends TextProps {
  center?: boolean;
  bold?: boolean;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export const SmallText = ({
  center,
  bold,
  children,
  style,
  ...props
}: SmallTextProps) => {
  return (
    <SmallTextContainer {...props} center={center} bold={bold} style={style}>
      {children}
    </SmallTextContainer>
  );
};
