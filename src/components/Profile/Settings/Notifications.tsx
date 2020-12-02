import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { MessagingTopics } from '../../../store/messaging/models';
import { ApplicationState } from '../../../store/reducers';
import { setMessageTopicEnabled } from '../../../store/settings/actions';
import { selectMessageTopicEnabled } from '../../../store/settings/selectors';
import { ToggleSelect } from '../../ToggleSelect';
import { SettingsRow } from './SettingsRow';

const OPTIONS = ['YES', 'NO'];

const OPTION_WIDTH = 50;

const NotificationsContainer = styled.View``;

interface NotificationsBaseProps {
  openedTradesEnabled: boolean;
  closedTradesEnabled: boolean;
  depositSuccessEnabled: boolean;
  onToggleOpenedTrades: () => void;
  onToggleClosedTrades: () => void;
  onToggleDepositSuccess: () => void;
}

const NotificationsBase = ({
  openedTradesEnabled,
  closedTradesEnabled,
  depositSuccessEnabled,
  onToggleOpenedTrades,
  onToggleClosedTrades,
  onToggleDepositSuccess,
}: NotificationsBaseProps) => {
  return (
    <NotificationsContainer>
      <SettingsRow label="Opened Trades">
        <ToggleSelect
          optionWidth={OPTION_WIDTH}
          options={OPTIONS}
          selectedOptionIndex={openedTradesEnabled ? 0 : 1}
          onSelectOption={onToggleOpenedTrades}
        />
      </SettingsRow>

      <SettingsRow label="Closed Trades">
        <ToggleSelect
          optionWidth={OPTION_WIDTH}
          options={OPTIONS}
          selectedOptionIndex={closedTradesEnabled ? 0 : 1}
          onSelectOption={onToggleClosedTrades}
        />
      </SettingsRow>

      <SettingsRow label="Successful Deposits">
        <ToggleSelect
          optionWidth={OPTION_WIDTH}
          options={OPTIONS}
          selectedOptionIndex={depositSuccessEnabled ? 0 : 1}
          onSelectOption={onToggleDepositSuccess}
        />
      </SettingsRow>
    </NotificationsContainer>
  );
};

interface NotificationsProps {}

export const Notifications = ({}: NotificationsProps) => {
  const dispatch = useDispatch();
  const openedTradesEnabled = useSelector((state: ApplicationState) =>
    selectMessageTopicEnabled(state, MessagingTopics.openedTrades),
  );
  const closedTradesEnabled = useSelector((state: ApplicationState) =>
    selectMessageTopicEnabled(state, MessagingTopics.closedTrades),
  );
  const depositSuccessEnabled = useSelector((state: ApplicationState) =>
    selectMessageTopicEnabled(state, MessagingTopics.depositSuccess),
  );

  const onToggleOpenedTrades = useCallback(() => {
    dispatch(
      setMessageTopicEnabled(
        MessagingTopics.openedTrades,
        !openedTradesEnabled,
      ),
    );
  }, [dispatch, openedTradesEnabled]);

  const onToggleClosedTrades = useCallback(() => {
    dispatch(
      setMessageTopicEnabled(
        MessagingTopics.closedTrades,
        !closedTradesEnabled,
      ),
    );
  }, [dispatch, closedTradesEnabled]);

  const onToggleDepositSuccess = useCallback(() => {
    dispatch(
      setMessageTopicEnabled(
        MessagingTopics.depositSuccess,
        !depositSuccessEnabled,
      ),
    );
  }, [dispatch, depositSuccessEnabled]);

  return (
    <NotificationsBase
      openedTradesEnabled={openedTradesEnabled}
      closedTradesEnabled={closedTradesEnabled}
      depositSuccessEnabled={depositSuccessEnabled}
      onToggleOpenedTrades={onToggleOpenedTrades}
      onToggleClosedTrades={onToggleClosedTrades}
      onToggleDepositSuccess={onToggleDepositSuccess}
    />
  );
};
