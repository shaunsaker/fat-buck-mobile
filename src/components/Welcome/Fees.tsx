import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../../constants';
import Logo from '../Logo';
import { ParagraphText } from '../ParagraphText';

const FeesContainer = styled.View`
  align-items: center;
`;

const LogoContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

const TextContainer = styled.View`
  margin-bottom: ${RHYTHM}px;
`;

interface FeesProps {}

export const Fees = ({}: FeesProps) => {
  return (
    <FeesContainer>
      <LogoContainer>
        <Logo size={120} />
      </LogoContainer>

      <TextContainer>
        <ParagraphText center>
          There’s no funny{' '}
          <ParagraphText center bold>
            business{' '}
          </ParagraphText>
          here.
        </ParagraphText>
      </TextContainer>

      <TextContainer>
        <ParagraphText center>
          We charge a flat{' '}
          <ParagraphText center bold>
            2.5% fee
          </ParagraphText>{' '}
          on deposits only. There are no trial periods so feel free to just
          watch the rest of us make the profits.
        </ParagraphText>
      </TextContainer>

      <TextContainer>
        <ParagraphText center>
          No{' '}
          <ParagraphText center bold>
            minimum
          </ParagraphText>{' '}
          deposits. Withdraw at anytime.
        </ParagraphText>
      </TextContainer>

      <ParagraphText center>
        So what are you waiting for!{' '}
        <ParagraphText center bold>
          Sign up
        </ParagraphText>{' '}
        now!
      </ParagraphText>
    </FeesContainer>
  );
};
