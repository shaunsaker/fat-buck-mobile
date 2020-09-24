import React from 'react';
import { HeaderBar } from '../HeaderBar';
import { Background } from '../Background';
import styled from 'styled-components/native';
import Button, { ButtonKinds } from '../Button';
import { PageHeader } from '../PageHeader';
import { LayoutContainer } from '../LayoutContainer';

const ErrorButtonsContainer = styled.View`
  align-items: center;
`;

const ErrorButtonContainer = styled.View`
  margin-bottom: 20px;
`;

interface ErrorProps {
  handleReloadApp: () => void;
  handleClearCache: () => void;
  handleContactSupport: () => void;
}

export const Error = ({
  handleReloadApp,
  handleClearCache,
  handleContactSupport,
}: ErrorProps) => {
  return (
    <Background>
      <HeaderBar />

      <PageHeader>Shit. We fucked up somewhere.</PageHeader>

      <LayoutContainer>
        <ErrorButtonsContainer>
          <ErrorButtonContainer>
            <Button kind={ButtonKinds.primary} onPress={handleReloadApp}>
              RELOAD APP
            </Button>
          </ErrorButtonContainer>

          <ErrorButtonContainer>
            <Button kind={ButtonKinds.primary} onPress={handleClearCache}>
              CLEAR CACHE
            </Button>
          </ErrorButtonContainer>

          <Button kind={ButtonKinds.primary} onPress={handleContactSupport}>
            CONTACT SUPPORT
          </Button>
        </ErrorButtonsContainer>
      </LayoutContainer>
    </Background>
  );
};
