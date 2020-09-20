import React from 'react';
import { HeaderBar } from '../HeaderBar';
import { Background } from '../Background';
import { ProfitSection } from '../ProfitSection';
import { BalanceSection } from '../BalanceSection';

export const Home = () => {
  return (
    <Background>
      <HeaderBar />

      <ProfitSection />

      <BalanceSection />
    </Background>
  );
};
