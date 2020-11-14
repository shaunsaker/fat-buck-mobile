import React from 'react';
import styled from 'styled-components/native';

const WithdrawalsContainer = styled.View`
  flex: 1;
`;

interface WithdrawalsProps {}

export const Withdrawals = ({}: WithdrawalsProps) => {
  return <WithdrawalsContainer />;
};
