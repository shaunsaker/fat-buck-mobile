import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { firestoreSaveDocument } from '../../services/db';
import { signInSuccess } from '../auth/actions';
import { testUser } from '../auth/mocks';
import { setCountryName } from '../country/actions';
import rootReducer from '../reducers';
import { showSnackbar } from '../snackbar/actions';
import { saveUser, saveUserError, saveUserSuccess } from './actions';
import { onSaveUserFlow, onSignInSuccessFlow } from './flow';
import { UserData } from './models';
import { MOCKED_MOMENT_ISO_STRING } from '../../../jest/setup';

describe('user flow', () => {
  describe('onSaveUserFlow', () => {
    const userData: UserData = {
      uid: '',
      email: '',
      cellphone: '',
      country: '',
      dateLastSignedIn: '',
    };

    it('saves the user', () => {
      return expectSaga(onSaveUserFlow, saveUser(userData))
        .provide([[matchers.call.fn(firestoreSaveDocument), undefined]])
        .put(saveUserSuccess())
        .run();
    });

    it('handles errors', () => {
      const errorMessage = 'Test';

      return expectSaga(onSaveUserFlow, saveUser(userData))
        .provide([
          [
            matchers.call.fn(firestoreSaveDocument),
            throwError(new Error(errorMessage)),
          ],
        ])
        .put(saveUserError())
        .put(showSnackbar(errorMessage))
        .run();
    });
  });

  describe('onSignInSuccessFlow', () => {
    const countryName = 'Australia';
    const dateLastSignedIn = MOCKED_MOMENT_ISO_STRING;
    const state = rootReducer(undefined, setCountryName(countryName));
    const userData: UserData = {
      uid: testUser.userCredential.user.uid,
      email: testUser.userCredential.user.email, // FIXME types
      cellphone: testUser.userCredential.user.phoneNumber, // FIXME types
      country: countryName,
      dateLastSignedIn,
    };

    it('puts saveUser', () => {
      return expectSaga(
        onSignInSuccessFlow,
        signInSuccess(testUser.userCredential.user),
      )
        .withState(state)
        .put(saveUser(userData))
        .run();
    });
  });
});
