import { action } from 'typesafe-actions';

import { DepositCalls, DepositCallsActionTypes } from './models';

export const syncDepositCalls = () =>
  action(DepositCallsActionTypes.SYNC_DEPOSIT_CALLS);

export const syncDepositCallsSuccess = (depositCalls: DepositCalls) =>
  action(DepositCallsActionTypes.SYNC_DEPOSIT_CALLS_SUCCESS, {
    depositCalls,
  });

export const syncDepositCallsError = () =>
  action(DepositCallsActionTypes.SYNC_DEPOSIT_CALLS_ERROR);

export const createDepositCall = (walletAddress: string) =>
  action(DepositCallsActionTypes.CREATE_DEPOSIT_CALL, {
    walletAddress,
  });

export const createDepositCallSuccess = () =>
  action(DepositCallsActionTypes.CREATE_DEPOSIT_CALL_SUCCESS);

export const createDepositCallError = () =>
  action(DepositCallsActionTypes.CREATE_DEPOSIT_CALL_ERROR);
