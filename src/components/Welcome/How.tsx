import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../constants';
import Logo, { LogoVariants } from '../Logo';
import { ParagraphText } from '../ParagraphText';

const HowContainer = styled.View`
  align-items: center;
`;

const LogoContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

const TextContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

interface HowProps {}

export const How = ({}: HowProps) => {
  return (
    <HowContainer>
      <LogoContainer>
        <Logo variant={LogoVariants.eating} size={120} />
      </LogoContainer>

      <TextContainer>
        <ParagraphText center>
          1. You deposit BTC into the{' '}
          <ParagraphText center bold>
            Pool
          </ParagraphText>
          .
        </ParagraphText>
      </TextContainer>

      <TextContainer>
        <ParagraphText center>
          2. Our bots make{' '}
          <ParagraphText center bold>
            trades
          </ParagraphText>{' '}
          from the Pool throughout the day.
        </ParagraphText>
      </TextContainer>

      <TextContainer>
        <ParagraphText center>
          3. Once a trade is closed, we calculate the{' '}
          <ParagraphText center bold>
            profit
          </ParagraphText>{' '}
          and split it according to your contribution to the Pool.
        </ParagraphText>
      </TextContainer>

      <TextContainer>
        <ParagraphText center>
          E.g. The Pool has 10 BTC. You own 1 BTC. A trade is closed and it made
          0.1 BTC in profit. Your share is 0.1 / (1 / 10) ={' '}
          <ParagraphText center bold>
            0.01 BTC
          </ParagraphText>
          .
        </ParagraphText>
      </TextContainer>
    </HowContainer>
  );
};
