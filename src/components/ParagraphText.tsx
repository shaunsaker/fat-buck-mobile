import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

interface SecondaryTextContainerProps {
  center?: boolean;
  bold?: boolean;
}

const SecondaryTextContainer = styled.Text<SecondaryTextContainerProps>`
  font-family: ${({ bold }) => (bold ? 'Recursive-Bold' : 'Recursive-Regular')};
  font-size: 14px;
  line-height: 22px;
  color: ${colors.white};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

interface SecondaryTextProps {
  center?: boolean;
  bold?: boolean;
  children: ReactNode;
}

export const ParagraphText = ({
  center,
  bold,
  children,
}: SecondaryTextProps) => {
  return (
    <SecondaryTextContainer center={center} bold={bold}>
      {children}
    </SecondaryTextContainer>
  );
};
