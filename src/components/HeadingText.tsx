import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

const HeadingTextContainer = styled.Text`
  font-family: 'Recursive-Bold';
  font-size: 16px;
  color: ${colors.white};
`;

interface HeadingTextProps {
  children: ReactNode;
}

export const HeadingText = ({ children }: HeadingTextProps) => {
  return <HeadingTextContainer>{children}</HeadingTextContainer>;
};
