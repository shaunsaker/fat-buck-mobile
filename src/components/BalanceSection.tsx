import React, { useCallback } from 'react';
import styled from 'styled-components/native';
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
  selectDisplayBalanceAsBTC,
  selectBalanceLoading,
} from '../store/balance/selectors';
import { setDisplayBalanceAsBTC } from '../store/actions';
import { selectSelectedCurrency } from '../store/currency/selectors';
import { Loader } from './Loader';
import { Screens } from '../Router';
import { IS_IOS, RHYTHM } from '../constants';
import { selectHasPendingDepositCalls } from '../store/depositCalls/selectors';
import { AnimatedNumber } from './AnimatedNumber';
import { navigate } from '../store/navigation/actions';

const BalanceSectionContainer = styled.View`
  padding: ${RHYTHM}px;
  align-items: center;
  background-color: ${colors.veryLightTransWhite};
`;

const BalanceSectionHeadingContainer = styled.View``;

const BalanceSectionBalanceContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const BalanceSectionProfilePercentageContainer = styled.View`
  position: absolute;
  bottom: ${IS_IOS ? 5 : 10}px;
  right: -32px;
`;

const BalanceSectionCurrencyValueContainer = styled.View`
  margin-bottom: ${RHYTHM / 2}px;
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
  top: ${RHYTHM - 2}px;
  right: ${({ right }) => (right ? `${RHYTHM}px` : 'auto')};
  left: ${({ left }) => (left ? `${RHYTHM}px` : 'auto')};
`;

const BalanceSectionLoaderContainer = styled.View`
  position: absolute;
  top: ${RHYTHM}px;
  right: ${RHYTHM}px;
`;

interface BalanceSectionBaseProps {
  value: string;
  currencyValue: string;
  currency: string;
  balanceTypes: string[];
  selectedBalanceTypeIndex: number;
  showActionButtons?: boolean;
  isLoading?: boolean;
  handleSelectBalanceType: (selectedBalanceTypeIndex: number) => void;
  handleDeposit: () => void;
  handleWithdraw: () => void;
}

const BalanceSectionBase = ({
  value,
  currencyValue,
  currency,
  balanceTypes,
  selectedBalanceTypeIndex,
  showActionButtons,
  isLoading,
  handleSelectBalanceType,
  handleDeposit,
}: // handleWithdraw,
BalanceSectionBaseProps) => {
  return (
    <BalanceSectionContainer>
      <BalanceSectionHeadingContainer>
        <HeadingText>Balance</HeadingText>
      </BalanceSectionHeadingContainer>

      <BalanceSectionBalanceContainer>
        <BigText>
          <AnimatedNumber
            key={selectedBalanceTypeIndex}
            digits={selectedBalanceTypeIndex === 0 ? 6 : 2}>
            {value}
          </AnimatedNumber>
        </BigText>

        <BalanceSectionProfilePercentageContainer>
          <ParagraphText>
            {balanceTypes[selectedBalanceTypeIndex]}
          </ParagraphText>
        </BalanceSectionProfilePercentageContainer>
      </BalanceSectionBalanceContainer>

      <BalanceSectionCurrencyValueContainer>
        <ParagraphText>
          1 BTC = <AnimatedNumber>{currencyValue}</AnimatedNumber> {currency}
        </ParagraphText>
      </BalanceSectionCurrencyValueContainer>

      <BalanceSectionBalanceTypeContainer>
        <ToggleSelect
          options={balanceTypes}
          selectedOptionIndex={selectedBalanceTypeIndex}
          onSelectOption={handleSelectBalanceType}
        />
      </BalanceSectionBalanceTypeContainer>

      {showActionButtons ? (
        <BalanceSectionActionButtonContainer right>
          <Button kind={ButtonKinds.primary} small onPress={handleDeposit}>
            DEPOSIT
          </Button>
        </BalanceSectionActionButtonContainer>
      ) : null}

      {/* {showActionButtons ? (
        <BalanceSectionActionButtonContainer left>
          <Button kind={ButtonKinds.accent} small onPress={handleWithdraw}>
            WITHDRAW
          </Button>
        </BalanceSectionActionButtonContainer>
      ) : null} */}

      {isLoading ? (
        <BalanceSectionLoaderContainer>
          <Loader />
        </BalanceSectionLoaderContainer>
      ) : null}
    </BalanceSectionContainer>
  );
};

interface BalanceSectionProps {
  showActionButtons?: boolean;
}

export const BalanceSection = ({
  showActionButtons = true,
}: BalanceSectionProps) => {
  const dispatch = useDispatch();
  const displayBalanceAsBTC = useSelector(selectDisplayBalanceAsBTC);
  const selectedBalanceTypeIndex = displayBalanceAsBTC === true ? 0 : 1;
  const value = useSelector(selectBalance); // TODO: handle personal balance
  const currencyValue = useSelector(selectBTCPrice);
  const currency = useSelector(selectSelectedCurrency);
  const isLoading = useSelector(selectBalanceLoading);
  const balanceTypes = ['BTC', currency];
  const hasPendingDepositCalls = useSelector(selectHasPendingDepositCalls);

  const onSelectBalanceType = useCallback(
    (index: number) => {
      const asBTC = index === 0 ? true : false;

      dispatch(setDisplayBalanceAsBTC(asBTC));
    },
    [dispatch],
  );

  const onDeposit = useCallback(() => {
    if (hasPendingDepositCalls) {
      dispatch(navigate(Screens.depositCalls));
    } else {
      dispatch(navigate(Screens.deposit));
    }
  }, [hasPendingDepositCalls, dispatch]);

  const onWithdraw = useCallback(() => {}, []);

  return (
    <BalanceSectionBase
      value={value}
      currencyValue={currencyValue}
      currency={currency}
      balanceTypes={balanceTypes}
      selectedBalanceTypeIndex={selectedBalanceTypeIndex}
      showActionButtons={showActionButtons}
      isLoading={isLoading}
      handleSelectBalanceType={onSelectBalanceType}
      handleDeposit={onDeposit}
      handleWithdraw={onWithdraw}
    />
  );
};
