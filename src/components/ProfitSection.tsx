import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { HeadingText } from './HeadingText';
import { BigText } from './BigText';
import { ParagraphText } from './ParagraphText';
import { ToggleSelect } from './ToggleSelect';
import {
  selectProfitCurrencyValue,
  selectProfitLoading,
  selectProfitPercent,
  selectProfitType,
} from '../store/profit/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ProfitTypes } from '../store/profit/models';
import { setProfitType } from '../store/actions';
import { selectSelectedCurrency } from '../store/currency/selectors';
import { Loader } from './Loader';
import { IS_IOS, RHYTHM } from '../constants';
import { AnimatedNumber } from './AnimatedNumber';

const ProfitSectionContainer = styled.View`
  padding: 0 0 ${RHYTHM}px;
  align-items: center;
`;

const ProfitSectionHeadingContainer = styled.View`
  margin-bottom: ${RHYTHM / 2}px;
`;

const ProfitSectionProfitContainer = styled.View`
  margin-bottom: ${RHYTHM / 2}px;
  flex-direction: row;
  align-items: flex-end;
`;

const ProfitSectionProfilePercentageContainer = styled.View`
  position: absolute;
  bottom: ${IS_IOS ? 5 : 10}px;
  right: -15px;
`;

const ProfitSectionCurrencyValueContainer = styled.View`
  margin-bottom: ${RHYTHM / 2}px;
`;

const ProfitSectionProfitTypeContainer = styled.View``;

const ProfitSectionLoaderContainer = styled.View`
  position: absolute;
  top: 0;
  right: ${RHYTHM}px;
`;

interface ProfitSectionBaseProps {
  value: string;
  currencyValue: string;
  currency: string;
  profitTypes: ProfitTypes[];
  selectedProfitTypeIndex: number;
  isLoading: boolean;
  handleSelectProfitType: (index: number) => void;
}

const ProfitSectionBase = ({
  value,
  currencyValue,
  currency,
  profitTypes,
  selectedProfitTypeIndex,
  isLoading,
  handleSelectProfitType,
}: ProfitSectionBaseProps) => {
  return (
    <ProfitSectionContainer>
      <ProfitSectionHeadingContainer>
        <HeadingText>Profit</HeadingText>
      </ProfitSectionHeadingContainer>

      <ProfitSectionProfitContainer>
        <BigText>
          <AnimatedNumber key={selectedProfitTypeIndex}>{value}</AnimatedNumber>
        </BigText>

        <ProfitSectionProfilePercentageContainer>
          <ParagraphText>%</ParagraphText>
        </ProfitSectionProfilePercentageContainer>
      </ProfitSectionProfitContainer>

      <ProfitSectionCurrencyValueContainer>
        <ParagraphText>
          <AnimatedNumber key={selectedProfitTypeIndex}>
            {currencyValue}
          </AnimatedNumber>{' '}
          {currency}
        </ParagraphText>
      </ProfitSectionCurrencyValueContainer>

      <ProfitSectionProfitTypeContainer>
        <ToggleSelect
          options={profitTypes}
          selectedOptionIndex={selectedProfitTypeIndex}
          onSelectOption={handleSelectProfitType}
        />
      </ProfitSectionProfitTypeContainer>

      {isLoading ? (
        <ProfitSectionLoaderContainer>
          <Loader />
        </ProfitSectionLoaderContainer>
      ) : null}
    </ProfitSectionContainer>
  );
};

export const ProfitSection = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectProfitPercent);
  const currencyValue = useSelector(selectProfitCurrencyValue);
  const selectedProfitType = useSelector(selectProfitType);
  const selectedProfitTypeIndex =
    selectedProfitType === ProfitTypes.toDate ? 0 : 1;
  const currency = useSelector(selectSelectedCurrency);
  const isLoading = useSelector(selectProfitLoading);
  const profitTypes = [ProfitTypes.toDate, ProfitTypes.annual];

  const onSelectProfitType = useCallback(
    (index: number) => {
      const asDate = index === 0 ? ProfitTypes.toDate : ProfitTypes.annual;

      dispatch(setProfitType(asDate));
    },
    [dispatch],
  );

  return (
    <ProfitSectionBase
      value={value}
      currencyValue={currencyValue}
      currency={currency}
      profitTypes={profitTypes}
      selectedProfitTypeIndex={selectedProfitTypeIndex}
      isLoading={isLoading}
      handleSelectProfitType={onSelectProfitType}
    />
  );
};
