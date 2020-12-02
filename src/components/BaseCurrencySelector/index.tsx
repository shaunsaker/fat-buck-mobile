import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { Background } from '../Background';
import { HeaderBar } from '../HeaderBar';
import { Input } from '../Input';
import { InputContainer } from '../InputContainer';
import { LayoutContainer } from '../LayoutContainer';
import { PageHeader } from '../PageHeader';
import { FlatList } from 'react-native';
import Button, { ButtonKinds } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { RHYTHM } from '../../constants';
import { navigateBack } from '../../store/navigation/actions';
import { setSelectedCurrency } from '../../store/actions';
import { selectAvailableCurrencies } from '../../store/currency/selectors';

const BaseCurrencySelectorInputContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

const CurrencyButtonContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

interface BaseCurrencySelectorBaseProps {
  searchValue: string;
  onChangeSearchValue: (text: string) => void;
  currencies: string[];
  onCurrencyPress: (currency: string) => void;
}

export const SEARCH_CURRENCIES_PLACEHOLDER_TEXT = 'Search currencies...';

const BaseCurrencySelectorBase = ({
  searchValue,
  onChangeSearchValue,
  currencies,
  onCurrencyPress,
}: BaseCurrencySelectorBaseProps) => {
  const renderItem = useCallback(
    ({ item: currency }: { item: string }) => (
      <CurrencyButtonContainer>
        <Button
          kind={ButtonKinds.secondary}
          fullWidth
          onPress={() => onCurrencyPress(currency)}>
          {currency}
        </Button>
      </CurrencyButtonContainer>
    ),
    [onCurrencyPress],
  );

  return (
    <Background>
      <HeaderBar showClose />

      <InputContainer>
        <PageHeader>Select your Currency</PageHeader>

        <LayoutContainer style={{ flex: 1 }}>
          <BaseCurrencySelectorInputContainer>
            <Input
              placeholder={SEARCH_CURRENCIES_PLACEHOLDER_TEXT}
              autoFocus
              value={searchValue}
              onChangeText={onChangeSearchValue}
            />
          </BaseCurrencySelectorInputContainer>

          <FlatList
            data={currencies}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            keyboardShouldPersistTaps="always" // allow button presses to dismiss keyboard
          />
        </LayoutContainer>
      </InputContainer>
    </Background>
  );
};

export const filterCurrencies = (currencies: string[], searchValue: string) => {
  const filteredCurrencies = currencies.filter((currency: string) => {
    if (searchValue.length) {
      return currency.toLowerCase().includes(searchValue.toLowerCase());
    }
    return currency;
  });

  return filteredCurrencies;
};

interface BaseCurrencySelectorProps {}

export const BaseCurrencySelector = ({}: BaseCurrencySelectorProps) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const availableCurrencies = useSelector(selectAvailableCurrencies);
  const currencies = filterCurrencies(availableCurrencies, searchValue);

  const onChangeSearchValue = useCallback(
    (text: string) => {
      setSearchValue(text);
    },
    [setSearchValue],
  );

  const onCurrencyPress = useCallback(
    (currency: string) => {
      dispatch(setSelectedCurrency(currency));
      dispatch(navigateBack());
    },
    [dispatch],
  );

  return (
    <BaseCurrencySelectorBase
      searchValue={searchValue}
      onChangeSearchValue={onChangeSearchValue}
      currencies={currencies}
      onCurrencyPress={onCurrencyPress}
    />
  );
};
