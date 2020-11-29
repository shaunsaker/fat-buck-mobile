import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RHYTHM } from '../../constants';
import { selectDepositSliderIndex } from '../../store/sliders/selectors';
import { selectSelectedWalletId } from '../../store/wallets/selectors';
import { Step } from '../Step';
import { WalletsSection } from '../WalletsSection';
import { slides } from './slides';

const SelectWalletSlideContainer = styled.View`
  flex: 1;
`;

const WalletsSectionContainer = styled.View`
  flex: 1;
  margin: 0 -${RHYTHM}px;
`;

interface SelectWalletSlideBaseProps {
  isActive?: boolean;
  isDone?: boolean;
}

const SelectWalletSlideBase = ({
  isActive,
  isDone,
}: SelectWalletSlideBaseProps) => {
  return (
    <SelectWalletSlideContainer>
      <Step
        number={slides.selectWallet.slideIndex + 1}
        title="Select a Wallet to transfer from"
        subtitle="We will use this BTC address to verify your transfer."
        isActive={isActive}
        isDone={isDone}
      />

      <WalletsSectionContainer>
        <WalletsSection />
      </WalletsSectionContainer>
    </SelectWalletSlideContainer>
  );
};

interface SelectWalletSlideProps {}

export const SelectWalletSlide = ({}: SelectWalletSlideProps) => {
  const selectedWalletId = useSelector(selectSelectedWalletId);
  const slideIndex = useSelector(selectDepositSliderIndex);
  const isActive = slides.selectWallet.slideIndex === slideIndex;
  const isDone = Boolean(selectedWalletId);

  return <SelectWalletSlideBase isActive={isActive} isDone={isDone} />;
};
