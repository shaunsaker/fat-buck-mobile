import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../../constants';
import { DepositCalls } from '../../DepositCalls';

const DepositsContainer = styled.View`
  flex: 1;
  padding-top: ${RHYTHM}px;
`;

interface DepositsProps {}

export const Deposits = ({}: DepositsProps) => {
  return (
    <DepositsContainer>
      <DepositCalls />
    </DepositsContainer>
  );
};
