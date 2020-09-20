import { authReducer, initialState } from './reducer';
import {
  initiateSignIn,
  initiateSignInSuccess,
  signInError,
  signOut,
  signOutSuccess,
  signOutError,
  finaliseSignIn,
  finaliseSignInSuccess,
} from './actions';
import { setHasSeenWelcome } from '../store/actions';
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

  it('sets loading to true on FINALISE_SIGN_IN', () => {
    const nextState = authReducer(
      initialState,
      finaliseSignIn(testUser.pinCode, testUser.email, testUser.password),
    );

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on FINALISE_SIGN_IN_SUCCESS', () => {
    let nextState = authReducer(
      initialState,
      finaliseSignIn(testUser.pinCode, testUser.email, testUser.password),
    );
    nextState = authReducer(
      nextState,
      finaliseSignInSuccess(testUser.userCredential.user),
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

  it('sets isNewUser to true on SET_HAS_SEEN_WELCOME', () => {
    let nextState = authReducer(initialState, setHasSeenWelcome(true));

    expect(nextState.isNewUser).toEqual(true);
  });
});
