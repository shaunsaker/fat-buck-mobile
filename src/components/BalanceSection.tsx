import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { dimensions } from '../dimensions';
import { HeadingText } from './HeadingText';
import { BigText } from './BigText';
import { ParagraphText } from './ParagraphText';
import { ToggleSelect } from './ToggleSelect';
import Button, { ButtonKinds } from './Button';
import { colors } from '../colors';

enum BalanceType {
  btc = 'BTC',
  zar = 'ZAR',
}

const BalanceSectionContainer = styled.View`
  padding: ${dimensions.rhythm}px;
  align-items: center;
  background-color: ${colors.veryLightTransWhite};
`;

const BalanceSectionHeadingContainer = styled.View`
  margin-bottom: ${dimensions.rhythm / 2}px;
`;

const BalanceSectionBalanceContainer = styled.View`
  margin-bottom: ${dimensions.rhythm / 2}px;
  flex-direction: row;
  align-items: flex-end;
`;

const BalanceSectionProfilePercentageContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: -32px;
`;

const BalanceSectionCurrencyValueContainer = styled.View`
  margin-bottom: ${dimensions.rhythm / 2}px;
`;

const BalanceSectionBalanceTypeContainer = styled.View``;

interface BalanceSectionActionButtonContainerProps {
  right?: boolean;
  left?: boolean;
}

const BalanceSectionActionButtonContainer = styled.View<
  BalanceSectionActionButtonContainerProps
>`
  position: absolute;
  top: ${dimensions.rhythm + 3}px;
  right: ${({ right }) => (right ? `${dimensions.rhythm}px` : 'auto')};
  left: ${({ left }) => (left ? `${dimensions.rhythm}px` : 'auto')};
`;

interface BalanceSectionBaseProps {
  value: number;
  currencyValue: string;
  currency: string;
  selectedBalanceCurrency: string;
  balanceTypes: BalanceType[];
  selectedBalanceType: BalanceType;
  showActionButtons?: boolean;
  handleSelectBalanceType: (selectedBalanceType: BalanceType) => void;
  handleDeposit: () => void;
  handleWithdraw: () => void;
}

const BalanceSectionBase = ({
  value,
  currencyValue,
  currency,
  selectedBalanceCurrency,
  balanceTypes,
  selectedBalanceType,
  showActionButtons,
  handleSelectBalanceType,
  handleDeposit,
  handleWithdraw,
}: BalanceSectionBaseProps) => {
  return (
    <BalanceSectionContainer>
      <BalanceSectionHeadingContainer>
        <HeadingText>Balance</HeadingText>
      </BalanceSectionHeadingContainer>

      <BalanceSectionBalanceContainer>
        <BigText>{value}</BigText>

        <BalanceSectionProfilePercentageContainer>
          <ParagraphText>{selectedBalanceCurrency}</ParagraphText>
        </BalanceSectionProfilePercentageContainer>
      </BalanceSectionBalanceContainer>

      <BalanceSectionCurrencyValueContainer>
        <ParagraphText>
          1 BTC = {currency} {currencyValue}
        </ParagraphText>
      </BalanceSectionCurrencyValueContainer>

      <BalanceSectionBalanceTypeContainer>
        <ToggleSelect
          options={balanceTypes}
          selectedOption={selectedBalanceType}
          onSelectOption={handleSelectBalanceType}
        />
      </BalanceSectionBalanceTypeContainer>

      {showActionButtons ? (
        <BalanceSectionActionButtonContainer right>
          <Button kind={ButtonKinds.accentFilled} small onPress={handleDeposit}>
            DEPOSIT
          </Button>
        </BalanceSectionActionButtonContainer>
      ) : null}

      {showActionButtons ? (
        <BalanceSectionActionButtonContainer left>
          <Button kind={ButtonKinds.accent} small onPress={handleWithdraw}>
            WITHDRAW
          </Button>
        </BalanceSectionActionButtonContainer>
      ) : null}
    </BalanceSectionContainer>
  );
};

export const BalanceSection = () => {
  const [selectedBalanceType, setSelectedBalanceType] = useState(
    BalanceType.btc,
  ); // TEMP
  const value = 1.03;
  const currencyValue = '170 012.12';
  const currency = 'R';
  const selectedBalanceCurrency = 'BTC';
  const balanceTypes = [BalanceType.btc, BalanceType.zar];
  const showActionButtons = true;

  const onSelectBalanceType = useCallback((profitType: BalanceType) => {
    setSelectedBalanceType(profitType);
  }, []);

  const onDeposit = useCallback(() => {}, []);

  const onWithdraw = useCallback(() => {}, []);

  return (
    <BalanceSectionBase
      value={value}
      currencyValue={currencyValue}
      currency={currency}
      selectedBalanceCurrency={selectedBalanceCurrency}
      balanceTypes={balanceTypes}
      selectedBalanceType={selectedBalanceType}
      showActionButtons={showActionButtons}
      handleSelectBalanceType={onSelectBalanceType}
      handleDeposit={onDeposit}
      handleWithdraw={onWithdraw}
    />
  );
};
