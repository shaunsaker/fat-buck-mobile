import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { dimensions } from '../dimensions';
import { HeadingText } from './HeadingText';
import { BigText } from './BigText';
import { ParagraphText } from './ParagraphText';
import { ToggleSelect } from './ToggleSelect';

enum ProfitType {
  toDate = 'TO DATE',
  annual = 'ANNUAL',
}

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

interface ProfitSectionBaseProps {
  value: number;
  currencyValue: string;
  currency: string;
  profitTypes: ProfitType[];
  selectedProfitType: ProfitType;
  onSelectProfitType: (selectedProfitType: ProfitType) => void;
}

const ProfitSectionBase = ({
  value,
  currencyValue,
  currency,
  profitTypes,
  selectedProfitType,
  onSelectProfitType,
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
          {currency} {currencyValue}
        </ParagraphText>
      </ProfitSectionCurrencyValueContainer>

      <ProfitSectionProfitTypeContainer>
        <ToggleSelect
          options={profitTypes}
          selectedOption={selectedProfitType}
          onSelectOption={onSelectProfitType}
        />
      </ProfitSectionProfitTypeContainer>
    </ProfitSectionContainer>
  );
};

export const ProfitSection = () => {
  const [selectedProfitType, setSelectedProfitType] = useState(
    ProfitType.toDate,
  ); // TEMP
  const value = 64;
  const currencyValue = '3415.67';
  const currency = 'R';
  const profitTypes = [ProfitType.toDate, ProfitType.annual];

  const onSelectProfitType = useCallback((profitType: ProfitType) => {
    setSelectedProfitType(profitType);
  }, []);

  return (
    <ProfitSectionBase
      value={value}
      currencyValue={currencyValue}
      currency={currency}
      profitTypes={profitTypes}
      selectedProfitType={selectedProfitType}
      onSelectProfitType={onSelectProfitType}
    />
  );
};
