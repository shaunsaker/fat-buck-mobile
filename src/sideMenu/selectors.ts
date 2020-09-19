import { ApplicationState } from '../store/reducers';

export const selectIsSideMenuOpen = (state: ApplicationState) =>
  state.sideMenu.isOpen;
