import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import Animator from 'react-native-simple-animators';

const WIDTH = 100;
const HEIGHT = 30;

const ToggleSelectContainer = styled.View`
  flex-direction: row;
`;

interface ToggleSelectOptionContainerProps {
  isSelected: boolean;
}

const ToggleSelectOptionContainer = styled.TouchableOpacity<
  ToggleSelectOptionContainerProps
>`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  justify-content: center;
  align-items: center;
`;

const ToggleSelectOptionBackground = styled(Animator)`
  background-color: ${colors.primary};
  position: absolute;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  border-radius: ${HEIGHT / 2}px;
`;

const ToggleSelectOptionText = styled.Text`
  font-family: 'Recursive-Bold';
  font-size: 14px;
  color: ${colors.white};
`;

interface ToggleSelectProps<T> {
  options: T[];
  selectedOption: T;
  onSelectOption: (option: T) => void;
}

export const ToggleSelect = <T extends string>({
  options,
  selectedOption,
  onSelectOption,
}: ToggleSelectProps<T>) => {
  const selectedOptionIndex = options.findIndex(
    (option) => option === selectedOption,
  );

  return (
    <ToggleSelectContainer>
      <ToggleSelectOptionBackground
        type="translateX"
        initialValue={0}
        finalValue={WIDTH}
        shouldAnimateIn={Boolean(selectedOptionIndex > 0)}
        shouldAnimateOut={Boolean(selectedOptionIndex === 0)}
        duration={150}
      />

      {options.map((option) => (
        <ToggleSelectOptionContainer
          key={option}
          isSelected={option === selectedOption}
          onPress={() => onSelectOption(option)}>
          <ToggleSelectOptionText>{option}</ToggleSelectOptionText>
        </ToggleSelectOptionContainer>
      ))}
    </ToggleSelectContainer>
  );
};
