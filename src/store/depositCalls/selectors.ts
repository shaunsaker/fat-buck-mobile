import { ApplicationState } from '../reducers';
import { DepositCallStatus } from './models';

export const selectDepositCalls = (state: ApplicationState) =>
  state.depositCalls.data;

export const selectDepositCallsLoading = (state: ApplicationState) =>
  state.depositCalls.loading;

export const selectHasPendingDepositCalls = (state: ApplicationState) =>
  Object.keys(state.depositCalls.data).some(
    (key) => state.depositCalls.data[key].status === DepositCallStatus.PENDING,
  );

export const selectPendingDepositCalls = (state: ApplicationState) =>
  Object.keys(state.depositCalls.data)
    .filter(
      (key) =>
        state.depositCalls.data[key].status === DepositCallStatus.PENDING,
    )
    .map((key) => state.depositCalls.data[key]);
