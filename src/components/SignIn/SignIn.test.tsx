import React from 'react';
import {
  SignIn,
  SIGN_IN_EMAIL_PLACEHOLDER_TEXT,
  SIGN_IN_PASSWORD_PLACEHOLDER_TEXT,
  SIGN_IN_PHONE_PLACEHOLDER_TEXT,
  SIGN_IN_PIN_PLACEHOLDER_TEXT,
  SIGN_IN_SUBMIT_BUTTON_TEXT,
} from '.';
import { initiateSignIn, signIn } from '../../store/actions';
import rootReducer, { initialState } from '../../store/reducers';
import { changeInputText } from '../../testUtils/changeInputText';
import { mountComponent } from '../../testUtils/mountComponent';
import { pressButton } from '../../testUtils/pressButton';
import { initiateSignInSuccess } from '../../store/actions';
import { testUser } from '../../store/auth/mocks';

describe('SignIn', () => {
  const setupSignIn = ({
    email,
    password,
    phone,
    pin,
  }: {
    email: string;
    password: string;
    phone: string;
    pin?: string;
  }) => {
    let state;

    if (pin) {
      state = rootReducer(
        initialState,
        initiateSignInSuccess(testUser.confirmationResult),
      );
    }

    const component = mountComponent(<SignIn />, state);

    changeInputText({
      component,
      placeholderText: SIGN_IN_EMAIL_PLACEHOLDER_TEXT,
      text: email,
    });

    changeInputText({
      component,
      placeholderText: SIGN_IN_PASSWORD_PLACEHOLDER_TEXT,
      text: password,
    });

    changeInputText({
      component,
      placeholderText: SIGN_IN_PHONE_PLACEHOLDER_TEXT,
      text: phone,
    });

    if (pin) {
      changeInputText({
        component,
        placeholderText: SIGN_IN_PIN_PLACEHOLDER_TEXT,
        text: pin,
      });
    }

    pressButton({ component, buttonText: SIGN_IN_SUBMIT_BUTTON_TEXT });

    return component;
  };

  it('does not initiate sign in with invalid email', () => {
    const email = '';
    const password = '123123';
    const phone = '833771130';
    const component = setupSignIn({ email, password, phone });

    expect(component.spy).not.toHaveBeenCalled();
  });

  it('does not initiate sign in with invalid password', () => {
    const email = 'sakershaun@gmail.com';
    const password = '';
    const phone = '833771130';
    const component = setupSignIn({ email, password, phone });

    expect(component.spy).not.toHaveBeenCalled();
  });

  it('does not initiate sign in with invalid phone', () => {
    const email = 'sakershaun@gmail.com';
    const password = '123123';
    const phone = '';
    const component = setupSignIn({ email, password, phone });

    expect(component.spy).not.toHaveBeenCalled();
  });

  it('initiates sign in with valid credentials', () => {
    const email = 'sakershaun@gmail.com';
    const password = '123123';
    const phone = '833771130';
    const component = setupSignIn({ email, password, phone });

    const parsedPhone = `+27${phone}`; // FIXME: could extract this into a function
    expect(component.spy).toHaveBeenCalledWith(initiateSignIn(parsedPhone));
  });

  it('does not sign in with invalid pin', () => {
    const email = 'sakershaun@gmail.com';
    const password = '123123';
    const phone = '833771130';
    const pin = '123'; // needs to be >= 6 chars
    const component = setupSignIn({ email, password, phone, pin });

    expect(component.spy).not.toHaveBeenCalled();
  });

  it('signs in with valid pin', () => {
    const email = 'sakershaun@gmail.com';
    const password = '123123';
    const phone = '833771130';
    const pin = '123123';
    const component = setupSignIn({ email, password, phone, pin });

    expect(component.spy).toHaveBeenCalledWith(signIn(pin, email, password));
  });
});
