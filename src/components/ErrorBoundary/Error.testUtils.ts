import { fireEvent } from '@testing-library/react-native';
import { mountComponent } from '../../testUtils/mountComponent';
import {
  CLEAR_CACHE_BUTTON_TEXT,
  CONTACT_SUPPORT_BUTTON_TEXT,
  RELOAD_APP_BUTTON_TEXT,
} from './Error';

export const pressReloadAppButton = (
  component: ReturnType<typeof mountComponent>,
) => {
  const { getByText } = component;

  fireEvent.press(getByText(RELOAD_APP_BUTTON_TEXT));
};

export const pressClearCacheButton = (
  component: ReturnType<typeof mountComponent>,
) => {
  const { getByText } = component;

  fireEvent.press(getByText(CLEAR_CACHE_BUTTON_TEXT));
};

export const pressContactSupportButton = (
  component: ReturnType<typeof mountComponent>,
) => {
  const { getByText } = component;

  fireEvent.press(getByText(CONTACT_SUPPORT_BUTTON_TEXT));
};
