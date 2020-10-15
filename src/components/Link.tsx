import React from 'react';
import { TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { FONT_REGULAR } from '../constants';

const LinkContainer = styled.TouchableOpacity``;

const LinkText = styled.Text`
  font-family: ${FONT_REGULAR};
  font-size: 14px;
  color: ${colors.accent};
  text-decoration-line: underline;
`;

interface LinkProps {
  children: string;
  style?: TextStyle;
  onPress: () => void;
}

export const Link = ({ children, style, onPress }: LinkProps) => {
  return (
    <LinkContainer style={style} onPress={onPress}>
      <LinkText>{children}</LinkText>
    </LinkContainer>
  );
};
