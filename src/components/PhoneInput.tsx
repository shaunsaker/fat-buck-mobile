import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_BOLD, RHYTHM } from '../constants';
import { Input, InputProps, INPUT_PADDING } from './Input';

const PhoneInputContainer = styled.View``;

const PhoneInputAffixContainer = styled.TouchableOpacity`
  justify-content: center;
  padding: 0 ${RHYTHM / 2}px;
  margin-right: -${INPUT_PADDING / 2}px;
  border-right-width: 1px;
  border-style: solid;
  border-color: ${colors.transWhite};
`;

const PhoneInputAffixText = styled.Text`
  font-family: ${FONT_BOLD};
  font-size: 16px;
  color: ${colors.white};
  margin-bottom: 1px; /* alignment with input text */
`;

interface PhoneInputProps extends InputProps {
  countryFlagEmoji: string;
  countryCallingCode: string;
  onCountryCodePress: () => void;
}

export const PhoneInput = ({
  countryFlagEmoji = '',
  countryCallingCode = '',
  onCountryCodePress,
  ...props
}: PhoneInputProps) => {
  return (
    <PhoneInputContainer>
      <Input
        affix={
          <PhoneInputAffixContainer onPress={onCountryCodePress}>
            <PhoneInputAffixText>{`${countryFlagEmoji} ${countryCallingCode}`}</PhoneInputAffixText>
          </PhoneInputAffixContainer>
        }
        keyboardType="numeric"
        {...props}
      />
    </PhoneInputContainer>
  );
};
