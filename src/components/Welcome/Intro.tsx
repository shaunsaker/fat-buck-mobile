import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../constants';
import Logo from '../Logo';
import { ParagraphText } from '../ParagraphText';

const IntroContainer = styled.View`
  align-items: center;
`;

const LogoContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

interface IntroProps {}

export const Intro = ({}: IntroProps) => {
  return (
    <IntroContainer>
      <LogoContainer>
        <Logo size={120} />
      </LogoContainer>

      <ParagraphText center>
        A place to <ParagraphText bold>grow</ParagraphText> your Bitcoin while
        you eat, sleep, work, live.
      </ParagraphText>
    </IntroContainer>
  );
};
