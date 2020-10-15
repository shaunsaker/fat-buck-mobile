import { action } from 'typesafe-actions';
import { NavigateActionTypes } from './models';

export const navigateBack = () => action(NavigateActionTypes.NAVIGATE_BACK);
