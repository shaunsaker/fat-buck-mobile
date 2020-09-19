import React from 'react';
import styled from 'styled-components/native';
import { dimensions } from '../../dimensions';
import Logo from '../Logo';
import { ParagraphText } from '../ParagraphText';

const BotContainer = styled.View`
  align-items: center;
`;

const LogoContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
`;

const TextContainer = styled.View`
  margin-bottom: ${dimensions.rhythm}px;
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
            super smart bot
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

      <ParagraphText center>
        <ParagraphText center bold>
          Note:{' '}
        </ParagraphText>
        Your investment is subject to BTC price fluctuations. Past results are
        not an indicator of future results (but they help).
      </ParagraphText>
    </BotContainer>
  );
};
