import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TextInputProperties, TextInput, Platform } from 'react-native';

const HEIGHT = 50;

interface InputContainerProps {
  isFocussed: boolean;
  hasValue: boolean;
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
  border-color: ${({ isFocussed, hasValue }) =>
    isFocussed || hasValue ? colors.primary : colors.white};
  background-color: ${({ isFocussed }) =>
    isFocussed ? colors.lightPrimary : 'transparent'};
  padding: 0 ${HEIGHT / 2}px;
  align-self: stretch;
`;

interface InputBaseProps extends InputProps {
  isFocussed: boolean;
  hasValue: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

const InputBase = ({
  placeholder,
  isFocussed,
  hasValue,
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
      isFocussed={isFocussed}
      hasValue={hasValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

interface InputProps extends TextInputProperties {}

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
