import { authReducer, initialState } from './reducer';
import {
  createUserWithEmailAndPassword,
  createUserWithEmailAndPasswordSuccess,
  signInError,
  signOut,
  signOutSuccess,
  signOutError,
} from './actions';

describe('auth reducer', () => {
  const email = 'sakershaun@gmail.com';
  const password = '123123';
  const uid = '111111';

  it('sets loading to true on SIGN_IN', () => {
    const nextState = authReducer(
      initialState,
      createUserWithEmailAndPassword(email, password),
    );

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on SIGN_IN_SUCCESS', () => {
    const nextState = authReducer(
      initialState,
      createUserWithEmailAndPasswordSuccess(uid, email),
    );

    expect(nextState.loading).toEqual(false);
    expect(nextState.uid).toEqual(uid);
    expect(nextState.email).toEqual(email);
  });

  it('sets loading to false on SIGN_IN_ERROR', () => {
    let nextState = authReducer(
      initialState,
      createUserWithEmailAndPassword(email, password),
    );
    nextState = authReducer(nextState, signInError());

    expect(nextState.loading).toEqual(false);
  });

  it('sets loading to true on SIGN_OUT', () => {
    const nextState = authReducer(initialState, signOut());

    expect(nextState.loading).toEqual(true);
  });

  it('returns initial state on SIGN_OUT_SUCCESS', () => {
    let nextState = authReducer(
      initialState,
      createUserWithEmailAndPasswordSuccess(uid, email),
    );
    nextState = authReducer(nextState, signOutSuccess());

    expect(nextState).toEqual(initialState);
  });

  it('sets loading to false on SIGN_OUT_ERROR', () => {
    let nextState = authReducer(initialState, signOut());
    nextState = authReducer(nextState, signOutError());

    expect(nextState.loading).toEqual(false);
  });
});
