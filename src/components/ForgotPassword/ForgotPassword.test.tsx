import React from 'react';
import { ForgotPassword } from '.';
import { sendPasswordResetEmail } from '../../store/actions';
import { dismissKeyboard } from '../../store/services/actions';
import { mountComponent } from '../../testUtils/mountComponent';
import { changeEmail, pressSubmit } from './ForgotPassword.testUtils';

describe('ForgotPassword', () => {
  it('submits a valid email', () => {
    const component = mountComponent(<ForgotPassword />);

    const email = 'test@gmail.com';
    changeEmail(component, email);
    pressSubmit(component);

    expect(component.spy).toHaveBeenCalledWith(dismissKeyboard());
    expect(component.spy).toHaveBeenCalledWith(sendPasswordResetEmail(email));
  });

  it('does not submit an invalid email', () => {
    const component = mountComponent(<ForgotPassword />);

    const invalidEmail = 'test';
    changeEmail(component, invalidEmail);
    pressSubmit(component);

    expect(component.spy).not.toHaveBeenCalled();
  });
});
