import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import { call } from 'redux-saga/effects';
import {
  firebaseGetEmailCredential,
  firebaseLinkWithCredential,
  firebaseSendPasswordResetEmail,
  firebaseSignInWithCredential,
  firebaseSignInWithPhoneNumber,
  firebaseSignOut,
  firebaseVerifyPinCode,
} from '../../services/auth';
import { initialState } from '../reducers';
import { showSnackbar } from '../snackbar/actions';
import {
  initiateSignIn,
  initiateSignInSuccess,
  sendPasswordResetEmail,
  sendPasswordResetEmailError,
  sendPasswordResetEmailSuccess,
  signIn,
  signInError,
  signInSuccess,
  signOutError,
  signOutSuccess,
} from './actions';
import {
  onInitiateSignInFlow,
  PASSWORD_RESET_SUCCESS_MESSAGE,
  onSendPasswordResetEmailFlow,
  onSignInFlow,
  onSignOutFlow,
  SIGN_IN_SUCCESS_MESSAGE,
  SIGN_OUT_SUCCESS_MESSAGE,
} from './flow';
import { testUser } from './mocks';
import { navigate, Screens } from '../../Router';

describe('auth flow', () => {
  describe('onInitiateSignInFlow', () => {
    it('initiates cellphone sign in', () => {
      return expectSaga(
        onInitiateSignInFlow,
        initiateSignIn(testUser.cellphone),
      )
        .provide([
          [
            matchers.call.fn(firebaseSignInWithPhoneNumber),
            testUser.confirmationResult,
          ],
        ])
        .put(initiateSignInSuccess(testUser.confirmationResult))
        .run();
    });

    it('handles errors', () => {
      const errorMessage = 'Test';

      return expectSaga(
        onInitiateSignInFlow,
        initiateSignIn(testUser.cellphone),
      )
        .provide([
          [
            call(firebaseSignInWithPhoneNumber, testUser.cellphone),
            throwError(new Error(errorMessage)),
          ],
        ])
        .put(signInError())
        .put(showSnackbar(errorMessage))
        .run();
    });
  });

  describe('onSignInFlow', () => {
    it('signs new users in', () => {
      return expectSaga(
        onSignInFlow,
        signIn(testUser.pinCode, testUser.email, testUser.password),
      )
        .withState(initialState)
        .provide([
          [
            matchers.call.fn(firebaseVerifyPinCode),
            { user: { email: '' } }, // no email === new user
          ],
          [
            matchers.call.fn(firebaseGetEmailCredential),
            testUser.emailCredential,
          ],
          [
            matchers.call.fn(firebaseLinkWithCredential),
            { user: { _user: testUser.userCredential.user } },
          ],
        ])
        .put(signInSuccess(testUser.userCredential.user))
        .put(showSnackbar(SIGN_IN_SUCCESS_MESSAGE))
        .run();
    });

    it('signs existing users in', () => {
      return expectSaga(
        onSignInFlow,
        signIn(testUser.pinCode, testUser.email, testUser.password),
      )
        .withState(initialState)
        .provide([
          [
            matchers.call.fn(firebaseVerifyPinCode),
            { user: { email: testUser.email } }, // email === existing user
          ],
          [
            matchers.call.fn(firebaseGetEmailCredential),
            testUser.emailCredential,
          ],
          [
            matchers.call.fn(firebaseSignInWithCredential),
            { user: { _user: testUser.userCredential.user } },
          ],
        ])
        .put(signInSuccess(testUser.userCredential.user))
        .put(showSnackbar(SIGN_IN_SUCCESS_MESSAGE))
        .run();
    });

    it('handles errors', () => {
      const errorMessage = 'Test';

      return expectSaga(
        onSignInFlow,
        signIn(testUser.pinCode, testUser.email, testUser.password),
      )
        .withState(initialState)
        .provide([
          [
            matchers.call.fn(firebaseVerifyPinCode),
            throwError(new Error(errorMessage)),
          ],
        ])
        .put(signInError())
        .put(showSnackbar(errorMessage))
        .run();
    });
  });

  describe('onSignOutFlow', () => {
    it('signs users out', () => {
      return expectSaga(onSignOutFlow)
        .provide([[matchers.call.fn(firebaseSignOut), undefined]])
        .put(signOutSuccess())
        .put(showSnackbar(SIGN_OUT_SUCCESS_MESSAGE))
        .run();
    });

    it('handles correctly', () => {
      const errorMessage = 'Test';

      return expectSaga(onSignOutFlow)
        .provide([
          [
            matchers.call.fn(firebaseSignOut),
            throwError(new Error(errorMessage)),
          ],
        ])
        .put(signOutError())
        .put(showSnackbar(errorMessage))
        .run();
    });
  });

  describe('sendPasswordResetFlow', () => {
    it('sends a password reset email', () => {
      return expectSaga(
        onSendPasswordResetEmailFlow,
        sendPasswordResetEmail(testUser.email),
      )
        .provide([
          [matchers.call.fn(firebaseSendPasswordResetEmail), undefined],
          [matchers.call.fn(navigate), undefined],
        ])
        .put(sendPasswordResetEmailSuccess())
        .put(showSnackbar(PASSWORD_RESET_SUCCESS_MESSAGE))
        .call(navigate, Screens.signIn)
        .run();
    });

    it('handles errors correctly', () => {
      const errorMessage = 'Test';

      return expectSaga(
        onSendPasswordResetEmailFlow,
        sendPasswordResetEmail(testUser.email),
      )
        .provide([
          [
            matchers.call.fn(firebaseSendPasswordResetEmail),
            throwError(new Error(errorMessage)),
          ],
        ])
        .put(sendPasswordResetEmailError())
        .put(showSnackbar(errorMessage))
        .run();
    });
  });
});
