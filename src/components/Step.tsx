import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import CheckIcon from '../icons/check.svg';
import { HeadingText } from './HeadingText';
import { ParagraphText } from './ParagraphText';
import { TitleText } from './TitleText';
import Animator from 'react-native-simple-animators';
import { ANIMATION_DURATION_SHORT, BORDER_WIDTH, RHYTHM } from '../constants';

interface StepContainerProps extends ViewProps {
  isActive?: boolean;
}

const StepContainer = styled.View<StepContainerProps>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RHYTHM}px;
`;

const STEP_ICON_SIZE = 50;

interface StepHeaderIconContainerProps {
  isActive?: boolean;
  isDone?: boolean;
}

const StepHeaderIconContainer = styled.View<StepHeaderIconContainerProps>`
  width: ${STEP_ICON_SIZE}px;
  height: ${STEP_ICON_SIZE}px;
  border-radius: ${STEP_ICON_SIZE}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isDone }) =>
    isDone ? colors.success : colors.transWhite};
  border-width: ${BORDER_WIDTH}px;
  border-color: ${({ isActive, isDone }) =>
    isDone ? colors.success : isActive ? colors.primary : 'transparent'};
  opacity: ${({ isActive, isDone }) => (isActive || isDone ? 1.0 : 0.67)};
  margin-right: ${RHYTHM}px;
`;

const StepHeaderTextContainer = styled.View`
  flex: 1;
`;

const StepHeaderHeadingTextContainer = styled.View`
  margin-bottom: ${RHYTHM / 4}px;
`;

interface StepProps {
  number: number;
  title: string;
  subtitle: string;
  isActive?: boolean;
  isDone?: boolean;
}

export const Step = ({
  number,
  title,
  subtitle,
  isActive,
  isDone,
}: StepProps) => {
  return (
    <StepContainer isActive={isActive}>
      <StepHeaderIconContainer isActive={isActive} isDone={isDone}>
        {isDone ? (
          <Animator
            type="scale"
            initialValue={0}
            finalValue={1}
            shouldAnimateIn
            duration={ANIMATION_DURATION_SHORT}>
            <CheckIcon width={32} height={32} fill={colors.white} />
          </Animator>
        ) : (
          <TitleText>{number}</TitleText>
        )}
      </StepHeaderIconContainer>

      <StepHeaderTextContainer>
        <StepHeaderHeadingTextContainer>
          <HeadingText>{title}</HeadingText>
        </StepHeaderHeadingTextContainer>

        <ParagraphText>{subtitle}</ParagraphText>
      </StepHeaderTextContainer>
    </StepContainer>
  );
};
