import { action } from 'typesafe-actions';

import { SideMenuActionTypes } from './models';

export const setSideMenuIsOpen = (isOpen: boolean) =>
  action(SideMenuActionTypes.SET_SIDE_MENU_IS_OPEN, { isOpen });
