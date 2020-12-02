import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RHYTHM } from '../../../constants';
import { Screens } from '../../../Router';
import { Currency } from '../../../store/currency/models';
import { selectSelectedCurrency } from '../../../store/currency/selectors';
import { navigate } from '../../../store/navigation/actions';
import { Link } from '../../Link';
import { ParagraphText } from '../../ParagraphText';
import { SettingsRow } from './SettingsRow';

const GeneralContainer = styled.View``;

const BaseCurrencyContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LinkContainer = styled.View`
  margin-left: ${RHYTHM / 2}px;
`;

interface GeneralBaseProps {
  selectedCurrency: Currency;
  onChangeBaseCurrency: () => void;
}

const GeneralBase = ({
  selectedCurrency,
  onChangeBaseCurrency,
}: GeneralBaseProps) => {
  return (
    <GeneralContainer>
      <SettingsRow label="Base Currency">
        <BaseCurrencyContainer>
          <ParagraphText bold>{selectedCurrency}</ParagraphText>

          <LinkContainer>
            <Link onPress={onChangeBaseCurrency}>Change</Link>
          </LinkContainer>
        </BaseCurrencyContainer>
      </SettingsRow>
    </GeneralContainer>
  );
};

interface GeneralProps {}

export const General = ({}: GeneralProps) => {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector(selectSelectedCurrency);

  const onChangeBaseCurrency = useCallback(() => {
    dispatch(navigate(Screens.baseCurrencySelector));
  }, [dispatch]);

  return (
    <GeneralBase
      selectedCurrency={selectedCurrency}
      onChangeBaseCurrency={onChangeBaseCurrency}
    />
  );
};
