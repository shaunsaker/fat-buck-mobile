import React from 'react';
import styled from 'styled-components/native';
import { Step } from '../Step';
import { slides } from './slides';

const SuccessSlideContainer = styled.View`
  flex: 1;
`;

interface SuccessSlideProps {}

export const SuccessSlide = ({}: SuccessSlideProps) => {
  return (
    <SuccessSlideContainer>
      <Step
        number={slides.success.slideIndex + 1}
        title="Sit back and relax!"
        subtitle="We'll let you know once your BTC has arrived. "
        isActive
        isDone
      />
    </SuccessSlideContainer>
  );
};
