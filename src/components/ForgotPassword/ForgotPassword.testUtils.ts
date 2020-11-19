import { fireEvent } from '@testing-library/react-native';
import {
  FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT,
  FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT,
} from '.';
import { mountComponent } from '../../testUtils/mountComponent';

export const changeEmail = (
  component: ReturnType<typeof mountComponent>,
  text: string,
) => {
  const { getByPlaceholderText } = component;

  fireEvent.changeText(
    getByPlaceholderText(FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT),
    text,
  );
};

export const pressSubmit = (component: ReturnType<typeof mountComponent>) => {
  const { getByText } = component;

  fireEvent.press(getByText(FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT));
};
