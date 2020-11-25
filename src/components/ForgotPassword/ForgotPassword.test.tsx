import React from 'react';
import {
  ForgotPassword,
  FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT,
  FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT,
} from '.';
import { sendPasswordResetEmail } from '../../store/actions';
import { dismissKeyboard } from '../../store/services/actions';
import { changeInputText } from '../../testUtils/changeInputText';
import { mountComponent } from '../../testUtils/mountComponent';
import { pressButton } from '../../testUtils/pressButton';

describe('ForgotPassword', () => {
  it('submits a valid email', () => {
    const component = mountComponent(<ForgotPassword />);

    const email = 'test@gmail.com';
    changeInputText({
      component,
      placeholderText: FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT,
      text: email,
    });

    pressButton({ component, buttonText: FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT });

    expect(component.spy).toHaveBeenCalledWith(dismissKeyboard());
    expect(component.spy).toHaveBeenCalledWith(sendPasswordResetEmail(email));
  });

  it('does not submit an invalid email', () => {
    const component = mountComponent(<ForgotPassword />);

    const invalidEmail = 'test';
    changeInputText({
      component,
      placeholderText: FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT,
      text: invalidEmail,
    });

    pressButton({ component, buttonText: FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT });

    expect(component.spy).not.toHaveBeenCalled();
  });
});
