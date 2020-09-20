import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

interface ParagraphTextContainerProps {
  center?: boolean;
  bold?: boolean;
}

const ParagraphTextContainer = styled.Text<ParagraphTextContainerProps>`
  font-family: ${({ bold }) => (bold ? 'Recursive-Bold' : 'Recursive-Regular')};
  font-size: 14px;
  line-height: 22px;
  color: ${colors.white};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  max-width: 360px;
  align-self: center;
`;

interface ParagraphTextProps {
  center?: boolean;
  bold?: boolean;
  children: ReactNode;
}

export const ParagraphText = ({
  center,
  bold,
  children,
}: ParagraphTextProps) => {
  return (
    <ParagraphTextContainer center={center} bold={bold}>
      {children}
    </ParagraphTextContainer>
  );
};
