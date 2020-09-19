import { authReducer, initialState } from './reducer';
import {
  initiateCreateUser,
  initiateCreateUserSuccess,
  signInError,
  signOut,
  signOutSuccess,
  signOutError,
  verifyPinCode,
  verifyPinCodeSuccess,
} from './actions';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { setHasSeenWelcome } from '../store/actions';

describe('auth reducer', () => {
  const email = 'sakershaun@gmail.com';
  const password = '123123';
  const cellphone = '+27833771130';
  const pinCode = '123123';
  const userCredential: FirebaseAuthTypes.UserCredential = {
    user: {
      displayName: '',
      email,
      emailVerified: false,
      isAnonymous: false,
      metadata: {},
      phoneNumber: cellphone,
      photoURL: '',
      providerData: [],
      providerId: '',
      uid: '',
      delete: () => {
        return new Promise(() => {});
      },
      getIdToken: () => {
        return new Promise(() => {});
      },
      getIdTokenResult: () => {
        return new Promise(() => {});
      },
      linkWithCredential: () => {
        return new Promise(() => {});
      },
      reauthenticateWithCredential: () => {
        return new Promise(() => {});
      },
      reload: () => {
        return new Promise(() => {});
      },
      sendEmailVerification: () => {
        return new Promise(() => {});
      },
      verifyBeforeUpdateEmail: () => {
        return new Promise(() => {});
      },
      toJSON: () => {
        return new Promise(() => {});
      },
      unlink: () => {
        return new Promise(() => {});
      },
      updateEmail: () => {
        return new Promise(() => {});
      },
      updatePassword: () => {
        return new Promise(() => {});
      },
      updatePhoneNumber: () => {
        return new Promise(() => {});
      },
      updateProfile: () => {
        return new Promise(() => {});
      },
    },
  };
  const confirmationResult = {
    verificationId: '1',
    confirm: (): Promise<FirebaseAuthTypes.UserCredential> => {
      return new Promise((resolve) => resolve(userCredential));
    },
  };

  it('sets loading to true on INITIATE_CREATE_USER', () => {
    const nextState = authReducer(initialState, initiateCreateUser(cellphone));

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on INITIATE_CREATE_USER_SUCCESS', () => {
    const nextState = authReducer(
      initialState,
      initiateCreateUserSuccess(confirmationResult),
    );

    expect(nextState.loading).toEqual(false);
    expect(nextState.confirmationResult).toEqual(confirmationResult);
  });

  it('sets loading to true on VERIFY_PIN_CODE', () => {
    const nextState = authReducer(
      initialState,
      verifyPinCode(pinCode, email, password),
    );

    expect(nextState.loading).toEqual(true);
  });

  it('sets state correctly on VERIFY_PIN_CODE_SUCCESS', () => {
    let nextState = authReducer(
      initialState,
      verifyPinCode(pinCode, email, password),
    );
    nextState = authReducer(
      nextState,
      verifyPinCodeSuccess(userCredential.user),
    );

    expect(nextState.email).toEqual(email);
    expect(nextState.phoneNumber).toEqual(cellphone);
    expect(nextState.loading).toEqual(false);
    expect(nextState.confirmationResult).toEqual(undefined);
  });

  it('sets loading to false on INITIATE_CREATE_USER_ERROR', () => {
    let nextState = authReducer(initialState, initiateCreateUser(cellphone));
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
