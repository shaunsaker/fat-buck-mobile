import React from 'react';
import { HeaderBar } from '../HeaderBar';
import { Background } from '../Background';
import { ProfitSection } from '../ProfitSection';

export const Home = () => {
  return (
    <Background>
      <HeaderBar />

      <ProfitSection />
    </Background>
  );
};
