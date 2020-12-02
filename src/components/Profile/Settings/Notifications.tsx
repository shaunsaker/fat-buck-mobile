import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import {
  setNotificationsClosedTradesEnabled,
  setNotificationsOpenedTradesEnabled,
} from '../../../store/settings/actions';
import {
  selectNotificationsClosedTradesEnabled,
  selectNotificationsOpenedTradesEnabled,
} from '../../../store/settings/selectors';
import { ToggleSelect } from '../../ToggleSelect';
import { SettingsRow } from './SettingsRow';

const OPTIONS = ['YES', 'NO'];

const NotificationsContainer = styled.View``;

interface NotificationsBaseProps {
  openedTradesEnabled: boolean;
  closedTradesEnabled: boolean;
  onToggleOpenedTrades: () => void;
  onToggleClosedTrades: () => void;
}

const NotificationsBase = ({
  openedTradesEnabled,
  closedTradesEnabled,
  onToggleOpenedTrades,
  onToggleClosedTrades,
}: NotificationsBaseProps) => {
  return (
    <NotificationsContainer>
      <SettingsRow label="Opened Trades">
        <ToggleSelect
          options={OPTIONS}
          selectedOptionIndex={openedTradesEnabled ? 0 : 1}
          onSelectOption={onToggleOpenedTrades}
        />
      </SettingsRow>

      <SettingsRow label="Closed Trades">
        <ToggleSelect
          options={OPTIONS}
          selectedOptionIndex={closedTradesEnabled ? 0 : 1}
          onSelectOption={onToggleClosedTrades}
        />
      </SettingsRow>
    </NotificationsContainer>
  );
};

interface NotificationsProps {}

export const Notifications = ({}: NotificationsProps) => {
  const dispatch = useDispatch();
  const openedTradesEnabled = useSelector(
    selectNotificationsOpenedTradesEnabled,
  );
  const closedTradesEnabled = useSelector(
    selectNotificationsClosedTradesEnabled,
  );

  const onToggleOpenedTrades = useCallback(() => {
    dispatch(setNotificationsOpenedTradesEnabled(!openedTradesEnabled));
  }, [dispatch, openedTradesEnabled]);

  const onToggleClosedTrades = useCallback(() => {
    dispatch(setNotificationsClosedTradesEnabled(!closedTradesEnabled));
  }, [dispatch, closedTradesEnabled]);

  return (
    <NotificationsBase
      openedTradesEnabled={openedTradesEnabled}
      closedTradesEnabled={closedTradesEnabled}
      onToggleOpenedTrades={onToggleOpenedTrades}
      onToggleClosedTrades={onToggleClosedTrades}
    />
  );
};
