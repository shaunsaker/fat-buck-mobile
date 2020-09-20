import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TextInputProperties, TextInput, Platform } from 'react-native';

const HEIGHT = 50;

interface InputContainerProps {
  isFocussed: boolean;
  hasValue: boolean;
  isValid: boolean;
}

const InputContainer = styled<InputContainerProps>(TextInput)`
  font-family: 'Recursive-Bold';
  font-weight: ${Platform.OS === 'android'
    ? 'normal'
    : 'bold'}; /* fix font-family android */
  font-size: 16px;
  color: ${colors.white};
  height: ${HEIGHT}px;
  border-radius: ${HEIGHT / 2}px;
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
  padding: 0 ${HEIGHT / 2}px;
`;

interface InputBaseProps extends InputProps {
  isFocussed: boolean;
  hasValue: boolean;
  isValid: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

const InputBase = ({
  placeholder,
  isFocussed,
  hasValue,
  isValid,
  handleFocus,
  handleBlur,
  ...props
}: InputBaseProps) => {
  return (
    <InputContainer
      {...props}
      placeholderTextColor={
        isFocussed ? colors.darkTransWhite : colors.transWhite
      }
      placeholder={placeholder}
      underlineColorAndroid="transparent"
      isFocussed={isFocussed}
      hasValue={hasValue}
      isValid={isValid}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

interface InputProps extends TextInputProperties {
  isValid: boolean;
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
      {...props}
      isFocussed={isFocussed}
      hasValue={hasValue}
      handleFocus={onFocus}
      handleBlur={onBlur}
    />
  );
};
