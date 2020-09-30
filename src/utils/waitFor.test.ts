import { expectSaga } from 'redux-saga-test-plan';
import { waitFor } from './waitFor';

interface State {
  authenticated: boolean;
}

describe('waitFor', () => {
  const initialState: State = {
    authenticated: false,
  };
  const selectAuthenticated = (state: State) => state.authenticated;

  it('takes all if the value does not change', () => {
    const nextState: State = initialState;
    return expectSaga(waitFor, selectAuthenticated, initialState.authenticated)
      .withState(nextState)
      .take('*')
      .run();
  });

  it('returns if the value changes', async () => {
    const nextState: State = {
      ...initialState,
      authenticated: true,
    };
    const { returnValue } = await expectSaga(
      waitFor,
      selectAuthenticated,
      initialState.authenticated,
    )
      .withState(nextState)
      .not.take('*')
      .run();

    expect(returnValue).toEqual(true);
  });
});
