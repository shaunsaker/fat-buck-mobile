import React from 'react';
import styled, { css } from 'styled-components/native';
import { colors } from '../colors';
import LinearGradient from 'react-native-linear-gradient';
import { Touchable } from './Touchable';
import { ActivityIndicator } from 'react-native';

export enum ButtonKinds {
  primary,
  secondary,
}

interface ButtonContainerProps {
  kind: ButtonKinds;
}

const HEIGHT = 45;

const ButtonContainer = styled(Touchable)<ButtonContainerProps>`
  width: 180px;
  height: ${HEIGHT}px;
  border-width: 3px;
  border-style: solid;
  border-color: ${({ kind }) =>
    kind === ButtonKinds.secondary ? colors.lightTransWhite : colors.primary};
  border-radius: ${HEIGHT / 2}px;
`;

const ButtonCss = css`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: ${HEIGHT / 2}px;
`;

const ButtonGradient = styled(LinearGradient)`
  ${ButtonCss}
`;

const ButtonBackground = styled.View`
  ${ButtonCss}
`;

interface ButtonTextProps {
  disabled: boolean;
}

const ButtonText = styled.Text<ButtonTextProps>`
  font-size: 16px;
  font-family: 'Recursive-Bold';
  color: ${({ disabled }) => (disabled ? colors.transWhite : colors.white)};
  font-weight: bold;
`;

interface ButtonProps {
  kind: ButtonKinds;
  loading?: boolean;
  disabled?: boolean;
  children: string;
  onPress: () => void;
}

export const Button = ({
  kind,
  loading,
  disabled = false,
  onPress,
  children,
}: ButtonProps) => {
  const childComponent = loading ? (
    <ActivityIndicator size="small" color={colors.white} />
  ) : (
    <ButtonText disabled={disabled}>{children}</ButtonText>
  );

  return (
    <ButtonContainer kind={kind} disabled={disabled} onPress={onPress}>
      {kind === ButtonKinds.primary ? (
        <ButtonGradient
          start={{ x: 0, y: 0.25 }}
          end={{ x: 1.5, y: 1.5 }}
          colors={[colors.primary, colors.black]}>
          {childComponent}
        </ButtonGradient>
      ) : (
        <ButtonBackground>{childComponent}</ButtonBackground>
      )}
    </ButtonContainer>
  );
};

export default Button;
