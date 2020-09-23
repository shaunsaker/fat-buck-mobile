import { ApplicationState } from '../reducers';

export const selectIsSideMenuOpen = (state: ApplicationState) =>
  state.sideMenu.isOpen;
