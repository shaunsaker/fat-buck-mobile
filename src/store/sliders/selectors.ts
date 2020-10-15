import { ApplicationState } from '../reducers';

export const selectWelcomeSliderIndex = (state: ApplicationState) =>
  state.sliders.welcome;

export const selectDepositSliderIndex = (state: ApplicationState) =>
  state.sliders.deposit;
