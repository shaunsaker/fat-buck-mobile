import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { RHYTHM } from '../constants';

const LayoutContainerContainer = styled.View`
  max-width: 360px;
  width: 100%;
  align-self: center;
  padding: ${RHYTHM}px;
`;

interface LayoutContainerProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export const LayoutContainer = ({ style, children }: LayoutContainerProps) => {
  return (
    <LayoutContainerContainer style={style}>
      {children}
    </LayoutContainerContainer>
  );
};
