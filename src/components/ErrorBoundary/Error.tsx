import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { Background } from '../Background';
import { HeaderBar } from '../HeaderBar';
import { PageHeader } from '../PageHeader';
import { LayoutContainer } from '../LayoutContainer';
import Button, { ButtonKinds } from '../Button';
import { CONTACT } from '../../config';
import { useDispatch } from 'react-redux';
import { restartApp, clearCache, openLink } from '../../store/services/actions';

const ErrorButtonsContainer = styled.View`
  align-items: center;
`;

const ErrorButtonContainer = styled.View`
  margin-bottom: 20px;
`;

export const RELOAD_APP_BUTTON_TEXT = 'RELOAD APP';
export const CLEAR_CACHE_BUTTON_TEXT = 'CLEAR CACHE';
export const CONTACT_SUPPORT_BUTTON_TEXT = 'CONTACT SUPPORT';

interface ErrorBaseProps {
  onReloadApp: () => void;
  onClearCache: () => void;
  onContactSupport: () => void;
}

export const ErrorBase = ({
  onReloadApp,
  onClearCache,
  onContactSupport,
}: ErrorBaseProps) => {
  return (
    <Background>
      <HeaderBar hideMenu />

      <PageHeader>Shit. We fucked up somewhere.</PageHeader>

      <LayoutContainer>
        <ErrorButtonsContainer>
          <ErrorButtonContainer>
            <Button kind={ButtonKinds.primary} onPress={onReloadApp}>
              RELOAD APP
            </Button>
          </ErrorButtonContainer>

          <ErrorButtonContainer>
            <Button kind={ButtonKinds.primary} onPress={onClearCache}>
              CLEAR CACHE
            </Button>
          </ErrorButtonContainer>

          <Button kind={ButtonKinds.primary} onPress={onContactSupport}>
            CONTACT SUPPORT
          </Button>
        </ErrorButtonsContainer>
      </LayoutContainer>
    </Background>
  );
};

export const CONTACT_LINK = `mailto:${CONTACT}`;

export const Error = () => {
  const dispatch = useDispatch();

  const onReloadApp = useCallback(() => {
    dispatch(restartApp());
  }, [dispatch]);

  const onClearCache = useCallback(() => {
    dispatch(clearCache());
  }, [dispatch]);

  const onContactSupport = useCallback(async () => {
    dispatch(openLink(CONTACT_LINK));
  }, [dispatch]);

  return (
    <ErrorBase
      onReloadApp={onReloadApp}
      onClearCache={onClearCache}
      onContactSupport={onContactSupport}
    />
  );
};
