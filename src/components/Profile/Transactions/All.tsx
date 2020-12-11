import React from 'react';
import styled from 'styled-components/native';

import { TransactionHistory } from './TransactionHistory';

const AllContainer = styled.View`
  flex: 1;
`;

interface AllProps {}

export const All = ({}: AllProps) => {
  return (
    <AllContainer>
      <TransactionHistory />
    </AllContainer>
  );
};
