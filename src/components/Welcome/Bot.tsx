import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../constants';
import Logo from '../Logo';
import { ParagraphText } from '../ParagraphText';

const BotContainer = styled.View`
  align-items: center;
`;

const LogoContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

const TextContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

interface BotProps {}

export const Bot = ({}: BotProps) => {
  return (
    <BotContainer>
      <LogoContainer>
        <Logo size={120} />
      </LogoContainer>

      <TextContainer>
        <ParagraphText center>
          Take the emotion out of it and let our{' '}
          <ParagraphText center bold>
            super smart bots
          </ParagraphText>{' '}
          do the trading for you.
        </ParagraphText>
      </TextContainer>

      <TextContainer>
        <ParagraphText center>
          Based on years of historical data and hundreds of simulations, we’ve
          chosen the most optimal strategies, with the ultimate goal of{' '}
          <ParagraphText center bold>
            making profit
          </ParagraphText>
          , no matter what the markets are doing!
        </ParagraphText>
      </TextContainer>
    </BotContainer>
  );
};
