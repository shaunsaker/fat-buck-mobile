import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { dimensions } from '../dimensions';

const LayoutContainerContainer = styled.View`
  max-width: 360px;
  width: 100%;
  align-self: center;
  padding: ${dimensions.rhythm}px;
`;

interface LayoutContainerProps {
  children: ReactNode;
}

export const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return <LayoutContainerContainer>{children}</LayoutContainerContainer>;
};
