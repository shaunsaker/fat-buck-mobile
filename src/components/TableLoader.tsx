import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import Animator from 'react-native-simple-animators';
import { dimensions } from '../dimensions';

const BASE_HEIGHT = 34.5;
const MARGIN = dimensions.rhythm / 2;

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
        duration={600}>
        <HorizontalLoaderContainer />
      </Animator>

      <Animator
        type="opacity"
        initialValue={0.167}
        finalValue={0.5}
        shouldAnimateIn
        shouldRepeat
        duration={600}>
        <HorizontalLoaderContainer />
      </Animator>

      <Animator
        type="opacity"
        initialValue={0.167}
        finalValue={0.25}
        shouldAnimateIn
        shouldRepeat
        duration={600}>
        <HorizontalLoaderContainer />
      </Animator>
    </>
  );
};
