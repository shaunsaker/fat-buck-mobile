import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import Animator from 'react-native-simple-animators';
import { ANIMATION_DURATION_SHORT, FONT_BOLD } from '../constants';
import { SMALL_BUTTON_HEIGHT } from './Button';

const ToggleSelectContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.veryLightTransWhite};
  border-radius: ${SMALL_BUTTON_HEIGHT / 2}px;
`;

interface ToggleSelectOptionContainerProps {
  width: number;
}

const ToggleSelectOptionContainer = styled.TouchableOpacity<
  ToggleSelectOptionContainerProps
>`
  width: ${({ width }) => width}px;
  height: ${SMALL_BUTTON_HEIGHT}px;
  justify-content: center;
  align-items: center;
`;

interface ToggleSelectOptionBackgroundProps {
  width: number;
}

const ToggleSelectOptionBackground = styled(Animator)<
  ToggleSelectOptionBackgroundProps
>`
  background-color: ${colors.accent};
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${SMALL_BUTTON_HEIGHT}px;
  border-radius: ${SMALL_BUTTON_HEIGHT / 2}px;
`;

const ToggleSelectOptionText = styled.Text`
  font-family: ${FONT_BOLD};
  font-size: 12px;
  color: ${colors.white};
`;

interface ToggleSelectProps<T> {
  optionWidth?: number;
  options: T[];
  selectedOptionIndex: number;
  onSelectOption: (index: number) => void;
}

export const ToggleSelect = <T extends string>({
  optionWidth = 100,
  options,
  selectedOptionIndex,
  onSelectOption,
}: ToggleSelectProps<T>) => {
  return (
    <ToggleSelectContainer>
      <ToggleSelectOptionBackground
        width={optionWidth}
        type="translateX"
        initialValue={0}
        finalValue={optionWidth}
        shouldAnimateIn={Boolean(selectedOptionIndex > 0)}
        shouldAnimateOut={Boolean(selectedOptionIndex === 0)}
        duration={ANIMATION_DURATION_SHORT}
      />

      {options.map((option, index) => (
        <ToggleSelectOptionContainer
          key={option}
          width={optionWidth}
          onPress={() => onSelectOption(index)}>
          <ToggleSelectOptionText>{option}</ToggleSelectOptionText>
        </ToggleSelectOptionContainer>
      ))}
    </ToggleSelectContainer>
  );
};
