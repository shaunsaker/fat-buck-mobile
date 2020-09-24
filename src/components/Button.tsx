import React from 'react';
import styled, { css } from 'styled-components/native';
import { colors } from '../colors';
import LinearGradient from 'react-native-linear-gradient';
import { Touchable } from './Touchable';
import { ActivityIndicator } from 'react-native';

export enum ButtonKinds {
  primary,
  secondary,
  accent,
  accentFilled,
  disabled,
}

interface ButtonContainerProps {
  kind: ButtonKinds;
  small?: boolean;
  fullWidth?: boolean;
}

const WIDTH = 180;
const SMALL_WIDTH = 90;
const HEIGHT = 45;
const SMALL_HEIGHT = 25;

const ButtonContainer = styled(Touchable)<ButtonContainerProps>`
  width: ${({ small, fullWidth }) =>
    small ? `${SMALL_WIDTH}px` : fullWidth ? 'auto' : `${WIDTH}px`};
  height: ${({ small }) => (small ? SMALL_HEIGHT : HEIGHT)}px;
  border-width: 3px;
  border-style: solid;
  border-color: ${({ kind }) =>
    kind === ButtonKinds.primary
      ? colors.primary
      : kind === ButtonKinds.disabled || kind === ButtonKinds.secondary
      ? colors.lightTransWhite
      : kind === ButtonKinds.accent || kind === ButtonKinds.accentFilled
      ? colors.accent
      : colors.white};
  border-radius: ${({ small }) => (small ? SMALL_HEIGHT / 2 : HEIGHT / 2)}px;
  background-color: ${({ kind }) =>
    kind === ButtonKinds.accentFilled ? colors.accent : 'transparent'};
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
  kind: ButtonKinds;
  small?: boolean;
  disabled?: boolean;
}

const ButtonText = styled.Text<ButtonTextProps>`
  font-size: ${({ small }) => (small ? 12 : 16)}px;
  font-family: 'Recursive-Bold';
  color: ${({ kind }) =>
    kind === ButtonKinds.disabled
      ? colors.transWhite
      : kind === ButtonKinds.accent
      ? colors.accent
      : colors.white};
`;

interface ButtonProps {
  kind: ButtonKinds;
  small?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: string;
  onPress: () => void;
}

export const Button = ({
  kind,
  small,
  loading,
  disabled,
  fullWidth,
  onPress,
  children,
}: ButtonProps) => {
  const renderedKind = disabled ? ButtonKinds.disabled : kind;
  const childComponent = loading ? (
    <ActivityIndicator size="small" color={colors.white} />
  ) : (
    <ButtonText kind={renderedKind} small={small}>
      {children}
    </ButtonText>
  );

  return (
    <ButtonContainer
      kind={renderedKind}
      small={small}
      disabled={disabled}
      fullWidth={fullWidth}
      onPress={onPress}>
      {renderedKind === ButtonKinds.primary ? (
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
