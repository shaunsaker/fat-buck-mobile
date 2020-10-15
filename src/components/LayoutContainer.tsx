import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../constants';

const LayoutContainerContainer = styled.View`
  max-width: 360px;
  width: 100%;
  align-self: center;
  padding: ${RHYTHM}px;
`;

interface LayoutContainerProps {
  children: ReactNode;
}

export const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return <LayoutContainerContainer>{children}</LayoutContainerContainer>;
};
