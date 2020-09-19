import {
  authRehydrateFlow,
  signOutFlow,
  SIGN_OUT_SUCCESS_MESSAGE,
  createUserWithEmailAndPasswordFlow,
  SIGN_IN_SUCCESS_MESSAGE,
} from './flow';
import { REHYDRATE } from 'redux-persist';
import { expectSaga } from 'redux-saga-test-plan';
import {
  signInError,
  createUserWithEmailAndPassword,
  signOut,
  signOutSuccess,
  createUserWithEmailAndPasswordSuccess,
} from './actions';
import rootReducer, { initialState } from '../store/reducers';
import {
  firebaseSignOut,
  firebaseSignInWithEmailAndPassword,
  firebaseCreateUserWithEmailAndPassword,
} from './services';
import { setSideMenuIsOpen, showSnackbar } from '../store/actions';
import {
  EXISTING_USER_EMAIL,
  NEW_USER_EMAIL,
  TEST_PASSWORD,
  TEST_UID,
} from '../../__mocks__/@react-native-firebase/auth';

describe('auth flow', () => {
  it('toggles loading to false if it was true on rehydrate', async () => {
    const state = rootReducer(
      initialState,
      createUserWithEmailAndPassword(EXISTING_USER_EMAIL, TEST_PASSWORD),
    );

    const result = await expectSaga(authRehydrateFlow)
      .withReducer(rootReducer)
      .withState(state)
      .dispatch({ type: REHYDRATE })
      .put(signInError())
      .run();

    expect(result.storeState.auth.loading).toEqual(false);
  });

  it('signs a new user in correctly', async () => {
    const result = await expectSaga(createUserWithEmailAndPasswordFlow)
      .withReducer(rootReducer)
      .dispatch(createUserWithEmailAndPassword(NEW_USER_EMAIL, TEST_PASSWORD))
      .call(firebaseSignInWithEmailAndPassword, NEW_USER_EMAIL, TEST_PASSWORD)
      .call(
        firebaseCreateUserWithEmailAndPassword,
        NEW_USER_EMAIL,
        TEST_PASSWORD,
      )
      .put(createUserWithEmailAndPasswordSuccess(TEST_UID, NEW_USER_EMAIL))
      .put(showSnackbar(SIGN_IN_SUCCESS_MESSAGE))
      .run();

    expect(result.storeState.auth.uid).toEqual(TEST_UID);
    expect(result.storeState.auth.email).toEqual(NEW_USER_EMAIL);
  });

  it('signs an existing user in correctly', async () => {
    const result = await expectSaga(createUserWithEmailAndPasswordFlow)
      .withReducer(rootReducer)
      .dispatch(
        createUserWithEmailAndPassword(EXISTING_USER_EMAIL, TEST_PASSWORD),
      )
      .call(
        firebaseSignInWithEmailAndPassword,
        EXISTING_USER_EMAIL,
        TEST_PASSWORD,
      )
      .put(createUserWithEmailAndPasswordSuccess(TEST_UID, EXISTING_USER_EMAIL))
      .put(showSnackbar(SIGN_IN_SUCCESS_MESSAGE))
      .run();

    expect(result.storeState.auth.uid).toEqual(TEST_UID);
    expect(result.storeState.auth.email).toEqual(EXISTING_USER_EMAIL);
  });

  it('signs a user out correctly', async () => {
    const result = await expectSaga(signOutFlow)
      .withReducer(rootReducer)
      .dispatch(
        createUserWithEmailAndPasswordSuccess(TEST_UID, EXISTING_USER_EMAIL),
      )
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
