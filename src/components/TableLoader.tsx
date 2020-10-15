import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import Animator from 'react-native-simple-animators';
import { ANIMATION_DURATION_LONG, RHYTHM } from '../constants';

const BASE_HEIGHT = 34.5;
const MARGIN = RHYTHM / 2;

const HorizontalLoaderContainer = styled.View`
  height: ${BASE_HEIGHT}px;
  background-color: ${colors.lightTransWhite};
  margin-bottom: ${MARGIN}px;
`;

interface HorizontalLoaderProps {}

export const TableLoader = ({}: HorizontalLoaderProps) => {
  return (
    <>
      <Animator
        type="opacity"
        initialValue={0.167}
        finalValue={0.75}
        shouldAnimateIn
        shouldRepeat
        duration={ANIMATION_DURATION_LONG}>
        <HorizontalLoaderContainer />
      </Animator>

      <Animator
        type="opacity"
        initialValue={0.167}
        finalValue={0.5}
        shouldAnimateIn
        shouldRepeat
        duration={ANIMATION_DURATION_LONG}>
        <HorizontalLoaderContainer />
      </Animator>

      <Animator
        type="opacity"
        initialValue={0.167}
        finalValue={0.25}
        shouldAnimateIn
        shouldRepeat
        duration={ANIMATION_DURATION_LONG}>
        <HorizontalLoaderContainer />
      </Animator>
    </>
  );
};
