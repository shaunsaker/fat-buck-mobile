import {
  finaliseSignInFlow,
  initiateSignInFlow,
  signOutFlow,
  SIGN_IN_SUCCESS_MESSAGE,
  SIGN_OUT_SUCCESS_MESSAGE,
} from './flow';
import { expectSaga } from 'redux-saga-test-plan';
import {
  finaliseSignIn,
  finaliseSignInSuccess,
  initiateSignIn,
  initiateSignInSuccess,
  signOut,
  signOutSuccess,
} from './actions';
import rootReducer from '../store/reducers';
import {
  firebaseGetEmailCredential,
  firebaseLinkWithCredential,
  firebaseSignInWithCredential,
  firebaseSignInWithPhoneNumber,
  firebaseSignOut,
  firebaseVerifyPinCode,
} from './services';
import { setSideMenuIsOpen, showSnackbar } from '../store/actions';
import { testUser } from './mocks';
import { initialState } from '../store/reducers';
import { selectAuthConfirmationResult } from './selectors';

describe('auth flow', () => {
  // TODO: how do we test that errors are handled correctly
  it('initiates sign in flow correctly', async () => {
    await expectSaga(initiateSignInFlow)
      .withReducer(rootReducer)
      .dispatch(initiateSignIn(testUser.cellphone))
      .call(firebaseSignInWithPhoneNumber, testUser.cellphone)
      .put(initiateSignInSuccess(testUser.confirmationResult))
      .run();
  });

  describe('finalises sign in flow correctly', () => {
    // TODO: finish this, how to mock the EmailAuthProvider?
    // it('with a new user', async () => {
    //   // we need to first run initiateSignIn so that our state has the confirmationResult
    //   const state = rootReducer(
    //     initialState,
    //     initiateSignInSuccess(testUser.confirmationResult),
    //   );
    //   await expectSaga(finaliseSignInFlow)
    //     .withReducer(rootReducer)
    //     .withState(state)
    //     .dispatch(
    //       finaliseSignIn(testUser.pinCode, testUser.email, testUser.password),
    //     )
    //     .select(selectAuthConfirmationResult)
    //     .call(
    //       firebaseVerifyPinCode,
    //       testUser.pinCode,
    //       testUser.confirmationResult,
    //     )
    //     .call(firebaseGetEmailCredential, testUser.email, testUser.password)
    //     .call(firebaseSignInWithCredential, testUser.emailCredential)
    //     .put(finaliseSignInSuccess(testUser.userCredential.user))
    //     .put(showSnackbar(SIGN_IN_SUCCESS_MESSAGE))
    //     .run();
    // });
    // it('with an existing user', () => {})
  });

  it('signs a user out correctly', async () => {
    const result = await expectSaga(signOutFlow)
      .withReducer(rootReducer)
      .dispatch(signOut())
      .call(firebaseSignOut)
      .put(signOutSuccess())
      .put(setSideMenuIsOpen(false))
      .put(showSnackbar(SIGN_OUT_SUCCESS_MESSAGE))
      .run();

    expect(result.storeState.auth.uid).toEqual('');
    expect(result.storeState.auth.email).toEqual('');
  });

  // TODO: test snackbar called on errors
});
