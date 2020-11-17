import { action } from 'typesafe-actions';
import { Screens } from '../../Router';
import { NavigateActionTypes } from './models';

export const navigateBack = () => action(NavigateActionTypes.NAVIGATE_BACK);

export const navigate = (screen: Screens) =>
  action(NavigateActionTypes.NAVIGATE, {
    screen,
  });
