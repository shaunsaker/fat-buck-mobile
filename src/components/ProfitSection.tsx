import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { dimensions } from '../dimensions';
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

const ProfitSectionContainer = styled.View`
  padding: 0 0 ${dimensions.rhythm}px;
  align-items: center;
`;

const ProfitSectionHeadingContainer = styled.View`
  margin-bottom: ${dimensions.rhythm / 2}px;
`;

const ProfitSectionProfitContainer = styled.View`
  margin-bottom: ${dimensions.rhythm / 2}px;
  flex-direction: row;
  align-items: flex-end;
`;

const ProfitSectionProfilePercentageContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: -15px;
`;

const ProfitSectionCurrencyValueContainer = styled.View`
  margin-bottom: ${dimensions.rhythm / 2}px;
`;

const ProfitSectionProfitTypeContainer = styled.View``;

const ProfitSectionLoaderContainer = styled.View`
  position: absolute;
  top: 0;
  right: ${dimensions.rhythm}px;
`;

interface ProfitSectionBaseProps {
  value: string;
  currencyValue: string;
  currency: string;
  profitTypes: ProfitTypes[];
  selectedProfitType: ProfitTypes;
  isLoading: boolean;
  handleSelectProfitType: (selectedProfitType: ProfitTypes) => void;
}

const ProfitSectionBase = ({
  value,
  currencyValue,
  currency,
  profitTypes,
  selectedProfitType,
  isLoading,
  handleSelectProfitType,
}: ProfitSectionBaseProps) => {
  return (
    <ProfitSectionContainer>
      <ProfitSectionHeadingContainer>
        <HeadingText>Profit</HeadingText>
      </ProfitSectionHeadingContainer>

      <ProfitSectionProfitContainer>
        <BigText>{value}</BigText>

        <ProfitSectionProfilePercentageContainer>
          <ParagraphText>%</ParagraphText>
        </ProfitSectionProfilePercentageContainer>
      </ProfitSectionProfitContainer>

      <ProfitSectionCurrencyValueContainer>
        <ParagraphText>
          {currencyValue} {currency}
        </ParagraphText>
      </ProfitSectionCurrencyValueContainer>

      <ProfitSectionProfitTypeContainer>
        <ToggleSelect
          options={profitTypes}
          selectedOption={selectedProfitType}
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
  const currency = useSelector(selectSelectedCurrency);
  const isLoading = useSelector(selectProfitLoading);
  const profitTypes = [ProfitTypes.toDate, ProfitTypes.annual];

  const onSelectProfitType = useCallback(
    (profitType: ProfitTypes) => {
      dispatch(setProfitType(profitType));
    },
    [dispatch],
  );

  return (
    <ProfitSectionBase
      value={value}
      currencyValue={currencyValue}
      currency={currency}
      profitTypes={profitTypes}
      selectedProfitType={selectedProfitType}
      isLoading={isLoading}
      handleSelectProfitType={onSelectProfitType}
    />
  );
};
