import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { Background } from '../Background';
import { HeaderBar } from '../HeaderBar';
import { Input, INPUT_PADDING } from '../Input';
import { InputContainer } from '../InputContainer';
import { LayoutContainer } from '../LayoutContainer';
import { PageHeader } from '../PageHeader';
import { dimensions } from '../../dimensions';
import { FlatList } from 'react-native';
import Button, { ButtonKinds } from '../Button';
import { ParagraphText } from '../ParagraphText';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountrySelectorSearchField } from '../../store/forms/selectors';
import { setCountryName, setFormField } from '../../store/actions';
import { CountrySelectorFields, Forms } from '../../store/forms/models';
import { navigate } from '../../Router';
import { CountryInfo } from '../../store/country/models';
import { getAllCountries } from '../../services/countriesInfo';

const CountrySelectorInputContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
`;

const CountryButtonContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
`;

const CountryFlagContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${INPUT_PADDING / 2}px;
  justify-content: center;
`;

interface CountrySelectorBaseProps {
  searchValue: string;
  onChangeSearchValue: (text: string) => void;
  countries: CountryInfo[];
  onCountryPress: (country: CountryInfo) => void;
}

const countriesListKeyExtractor = (country: CountryInfo) => country.name;

const CountrySelectorBase = ({
  searchValue,
  onChangeSearchValue,
  countries,
  onCountryPress,
}: CountrySelectorBaseProps) => {
  const renderCountry = useCallback(
    ({ item: country }: { item: CountryInfo }) => (
      <CountryButtonContainer>
        <Button
          kind={ButtonKinds.secondary}
          fullWidth
          onPress={() => onCountryPress(country)}>
          {country.name}
        </Button>

        <CountryFlagContainer pointerEvents="none">
          <ParagraphText>{country.emoji}</ParagraphText>
        </CountryFlagContainer>
      </CountryButtonContainer>
    ),
    [onCountryPress],
  );

  return (
    <Background>
      <HeaderBar showClose />

      <InputContainer>
        <PageHeader>Select your Country</PageHeader>

        <LayoutContainer>
          <CountrySelectorInputContainer>
            <Input
              placeholder="Search countries"
              autoFocus
              value={searchValue}
              onChangeText={onChangeSearchValue}
            />
          </CountrySelectorInputContainer>

          <FlatList
            data={countries}
            keyExtractor={countriesListKeyExtractor}
            renderItem={renderCountry}
            keyboardShouldPersistTaps="always" // allow button presses to dismiss keyboard
          />
        </LayoutContainer>
      </InputContainer>
    </Background>
  );
};

export const filterCountries = (
  countries: CountryInfo[],
  searchValue: string,
) => {
  const filteredCountries = countries.filter((country: CountryInfo) => {
    if (searchValue.length) {
      return country.name.toLowerCase().includes(searchValue.toLowerCase());
    }
    return country;
  });

  return filteredCountries;
};

interface CountrySelectorProps {}

export const CountrySelector = ({}: CountrySelectorProps) => {
  const searchValue = useSelector(selectCountrySelectorSearchField);
  const dispatch = useDispatch();
  const countries = filterCountries(getAllCountries(), searchValue);

  const onChangeSearchValue = useCallback(
    (text: string) => {
      dispatch(
        setFormField(Forms.countrySelector, CountrySelectorFields.search, text),
      );
    },
    [dispatch],
  );

  const onCountryPress = useCallback(
    (country: CountryInfo) => {
      dispatch(setCountryName(country.name));
      navigate();
    },
    [dispatch],
  );

  return (
    <CountrySelectorBase
      searchValue={searchValue}
      onChangeSearchValue={onChangeSearchValue}
      countries={countries}
      onCountryPress={onCountryPress}
    />
  );
};
