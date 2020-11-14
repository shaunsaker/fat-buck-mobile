import React from 'react';
import styled from 'styled-components/native';
import { WalletsSection } from '../WalletsSection';

const WalletsContainer = styled.View`
  flex: 1;
`;

interface WalletsProps {}

export const Wallets = ({}: WalletsProps) => {
  return (
    <WalletsContainer>
      <WalletsSection />
    </WalletsContainer>
  );
};
