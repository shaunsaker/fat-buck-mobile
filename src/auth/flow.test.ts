import {
  authRehydrateFlow,
  signOutFlow,
  SIGN_OUT_SUCCESS_MESSAGE,
} from './flow';
import { REHYDRATE } from 'redux-persist';
import { expectSaga } from 'redux-saga-test-plan';
import {
  signInError,
  initiateCreateUser,
  signOut,
  signOutSuccess,
  verifyPinCodeSuccess,
} from './actions';
import rootReducer, { initialState } from '../store/reducers';
import { firebaseSignOut } from './services';
import { setSideMenuIsOpen, showSnackbar } from '../store/actions';

describe('auth flow', () => {
  const cellphone = '+27833771130';

  it('toggles loading to false if it was true on rehydrate', async () => {
    const state = rootReducer(initialState, initiateCreateUser(cellphone));

    const result = await expectSaga(authRehydrateFlow)
      .withReducer(rootReducer)
      .withState(state)
      .dispatch({ type: REHYDRATE })
      .put(signInError())
      .run();

    expect(result.storeState.auth.loading).toEqual(false);
  });

  it('signs a user out correctly', async () => {
    const result = await expectSaga(signOutFlow)
      .withReducer(rootReducer)
      .dispatch(verifyPinCodeSuccess(TEST_UID, EXISTING_USER_EMAIL))
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
