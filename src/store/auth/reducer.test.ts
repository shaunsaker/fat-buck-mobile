import { authReducer, initialState } from './reducer';
import {
  initiateSignIn,
  initiateSignInSuccess,
  signInError,
  signOut,
  signOutSuccess,
  signOutError,
  signIn,
  signInSuccess,
  sendPasswordResetEmail,
  sendPasswordResetEmailSuccess,
} from './actions';
import { testUser } from './mocks';

describe('auth reducer', () => {
  it('sets loading to true on INITIATE_SIGN_IN', () => {
    const nextState = authReducer(
      initialState,
      initiateSignIn(testUser.cellphone),
    );

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on INITIATE_SIGN_IN_SUCCESS', () => {
    const nextState = authReducer(
      initialState,
      initiateSignInSuccess(testUser.confirmationResult),
    );

    expect(nextState.loading).toEqual(false);
    expect(nextState.confirmationResult).toEqual(testUser.confirmationResult);
  });

  it('sets loading to true on SIGN_IN', () => {
    const nextState = authReducer(
      initialState,
      signIn(testUser.pinCode, testUser.email, testUser.password),
    );

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SIGN_IN_SUCCESS', () => {
    let nextState = authReducer(
      initialState,
      signIn(testUser.pinCode, testUser.email, testUser.password),
    );
    nextState = authReducer(
      nextState,
      signInSuccess(testUser.userCredential.user),
    );

    expect(nextState.email).toEqual(testUser.email);
    expect(nextState.phoneNumber).toEqual(testUser.cellphone);
    expect(nextState.loading).toEqual(false);
    expect(nextState.confirmationResult).toEqual(undefined);
  });

  it('sets loading to false on INITIATE_SIGN_IN_ERROR', () => {
    let nextState = authReducer(
      initialState,
      initiateSignIn(testUser.cellphone),
    );
    nextState = authReducer(nextState, signInError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets loading to true on SIGN_OUT', () => {
    const nextState = authReducer(initialState, signOut());

    expect(nextState.loading).toEqual(true);
  });

  it('returns initial state on SIGN_OUT_SUCCESS', () => {
    let nextState = authReducer(initialState, signOutSuccess());
    nextState = authReducer(nextState, signOutSuccess());

    expect(nextState).toEqual(initialState);
  });

  it('sets loading to false on SIGN_OUT_ERROR', () => {
    let nextState = authReducer(initialState, signOut());
    nextState = authReducer(nextState, signOutError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets state correctly on SEND_PASSWORD_RESET_EMAIL', () => {
    let nextState = authReducer(
      initialState,
      sendPasswordResetEmail(testUser.email),
    );

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SEND_PASSWORD_RESET_EMAIL_SUCCESS', () => {
    let nextState = authReducer(initialState, sendPasswordResetEmailSuccess());

    expect(nextState.loading).toEqual(false);
  });
});
