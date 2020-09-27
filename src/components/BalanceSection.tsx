import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { dimensions } from '../dimensions';
import { HeadingText } from './HeadingText';
import { BigText } from './BigText';
import { ParagraphText } from './ParagraphText';
import { ToggleSelect } from './ToggleSelect';
import Button, { ButtonKinds } from './Button';
import { colors } from '../colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBalance,
  selectBTCPrice,
  selectBalanceType,
  selectBalanceLoading,
} from '../store/balance/selectors';
import { setBalanceType } from '../store/actions';
import { selectSelectedCurrency } from '../store/currency/selectors';
import { Loader } from './Loader';

enum BalanceTypes {
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

const BalanceSectionLoaderContainer = styled.View`
  position: absolute;
  top: ${dimensions.rhythm}px;
  right: ${dimensions.rhythm}px;
`;

interface BalanceSectionBaseProps {
  value: string;
  currencyValue: string;
  currency: string;
  balanceTypes: BalanceTypes[];
  balanceType: BalanceTypes;
  showActionButtons?: boolean;
  isLoading?: boolean;
  handleSelectBalanceType: (balanceType: BalanceTypes) => void;
  handleDeposit: () => void;
  handleWithdraw: () => void;
}

const BalanceSectionBase = ({
  value,
  currencyValue,
  currency,
  balanceTypes,
  balanceType,
  showActionButtons,
  isLoading,
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
          <ParagraphText>{balanceType}</ParagraphText>
        </BalanceSectionProfilePercentageContainer>
      </BalanceSectionBalanceContainer>

      <BalanceSectionCurrencyValueContainer>
        <ParagraphText>
          1 BTC = {currencyValue} {currency}
        </ParagraphText>
      </BalanceSectionCurrencyValueContainer>

      <BalanceSectionBalanceTypeContainer>
        <ToggleSelect
          options={balanceTypes}
          selectedOption={balanceType}
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

      {isLoading ? (
        <BalanceSectionLoaderContainer>
          <Loader />
        </BalanceSectionLoaderContainer>
      ) : null}
    </BalanceSectionContainer>
  );
};

export const BalanceSection = () => {
  const dispatch = useDispatch();
  const balanceType = useSelector(selectBalanceType);
  const value = useSelector(selectBalance);
  const currencyValue = useSelector(selectBTCPrice);
  const currency = useSelector(selectSelectedCurrency);
  const isLoading = useSelector(selectBalanceLoading);
  const balanceTypes = [BalanceTypes.btc, BalanceTypes.zar];
  const showActionButtons = false;

  const onSelectBalanceType = useCallback(
    (type: BalanceTypes) => {
      dispatch(setBalanceType(type));
    },
    [dispatch],
  );

  const onDeposit = useCallback(() => {}, []);

  const onWithdraw = useCallback(() => {}, []);

  return (
    <BalanceSectionBase
      value={value}
      currencyValue={currencyValue}
      currency={currency}
      balanceTypes={balanceTypes}
      balanceType={balanceType}
      showActionButtons={showActionButtons}
      isLoading={isLoading}
      handleSelectBalanceType={onSelectBalanceType}
      handleDeposit={onDeposit}
      handleWithdraw={onWithdraw}
    />
  );
};
