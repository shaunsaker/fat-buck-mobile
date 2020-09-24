import React, { useState, useCallback, ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TextInputProperties, TextInput, Platform } from 'react-native';

export const INPUT_HEIGHT = 50;
export const INPUT_PADDING = INPUT_HEIGHT / 2;

interface StyledInputContainerProps {
  isFocussed: boolean;
  hasValue: boolean;
  isValid?: boolean;
}

const StyledInputContainer = styled.View<StyledInputContainerProps>`
  flex-direction: row;
  border-radius: ${INPUT_HEIGHT / 2}px;
  border-width: 3px;
  border-style: solid;
  border-color: ${({ isFocussed, hasValue, isValid }) =>
    isValid
      ? colors.success
      : isFocussed || hasValue
      ? colors.primary
      : colors.white};
  background-color: ${({ isFocussed, isValid }) =>
    isFocussed
      ? isValid
        ? colors.lightSuccess
        : colors.lightPrimary
      : 'transparent'};
`;

const StyledInput = styled(TextInput)`
  font-family: 'Recursive-Bold';
  font-weight: ${Platform.OS === 'android'
    ? 'normal'
    : 'bold'}; /* fix font-family android */
  font-size: 16px;
  color: ${colors.white};
  height: ${INPUT_HEIGHT}px;
  padding: 0 ${INPUT_PADDING}px;
  width: 100%;
`;

interface InputBaseProps extends InputProps {
  isFocussed: boolean;
  hasValue: boolean;
  isValid?: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

const InputBase = ({
  placeholder,
  affix,
  isFocussed,
  hasValue,
  isValid,
  handleFocus,
  handleBlur,
  ...props
}: InputBaseProps) => {
  return (
    <StyledInputContainer
      isFocussed={isFocussed}
      hasValue={hasValue}
      isValid={isValid}>
      {affix}

      <StyledInput
        placeholderTextColor={
          isFocussed ? colors.darkTransWhite : colors.transWhite
        }
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </StyledInputContainer>
  );
};

export interface InputProps extends TextInputProperties {
  affix?: ReactNode;
  isValid?: boolean;
}

export const Input = (props: InputProps) => {
  const [isFocussed, setIsFocussed] = useState(false);
  const hasValue = Boolean(props.value);

  const onFocus = useCallback(() => {
    setIsFocussed(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocussed(false);
  }, []);

  return (
    <InputBase
      isFocussed={isFocussed}
      hasValue={hasValue}
      handleFocus={onFocus}
      handleBlur={onBlur}
      {...props}
    />
  );
};
