import { expectSaga } from 'redux-saga-test-plan';
import { setHasSeenWelcome } from './actions';
import { onSignInSuccessFlow } from './flow';

describe('welcome flow', () => {
  describe('onSignInSuccessFlow', () => {
    it('puts setHasSeenWelcome', () => {
      return expectSaga(onSignInSuccessFlow).put(setHasSeenWelcome(true)).run();
    });
  });
});
