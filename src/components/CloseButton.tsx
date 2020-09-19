import React from 'react';
import styled from 'styled-components/native';
import { TouchableIcon } from './TouchableIcon';
import CloseIcon from '../icons/close.svg';
import { colors } from '../colors';

const CloseButtonContainer = styled(TouchableIcon)``;

interface CloseButtonProps {
  handlePress: () => void;
}

export const CloseButton = ({ handlePress }: CloseButtonProps) => {
  return (
    <CloseButtonContainer onPress={handlePress}>
      <CloseIcon width={24} height={24} fill={colors.white} />
    </CloseButtonContainer>
  );
};
