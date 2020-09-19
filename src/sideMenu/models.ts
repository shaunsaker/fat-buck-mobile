export enum SideMenuActionTypes {
  SET_SIDE_MENU_IS_OPEN = '@@sideMenu/SET_SIDE_MENU_IS_OPEN',
}

export interface SideMenuState {
  isOpen: boolean;
}
