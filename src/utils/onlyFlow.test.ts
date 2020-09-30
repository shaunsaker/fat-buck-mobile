import { SagaIterator } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';
import { onlyFlow } from './onlyFlow';
import { waitFor } from './waitFor';

interface State {
  authenticated: boolean;
}

describe('onlyFlow', () => {
  const initialState: State = {
    authenticated: false,
  };
  const selectAuthenticated = (state: State) => state.authenticated;
  const setAuthenticated = 'SET_AUTHENTICATED';
  const reducer = (state = initialState, action: any): State => {
    if (action.type === setAuthenticated) {
      return {
        ...state,
        authenticated: action.payload.authenticated,
      };
    }
    return state;
  };

  function* mockedSaga(): SagaIterator {}

  it('calls the passed saga and onlyFlow when the selector value is truthy', () => {
    const state: State = {
      ...initialState,
      authenticated: true,
    };

    return (
      expectSaga(
        onlyFlow,
        selectAuthenticated,
        initialState.authenticated,
        mockedSaga,
      )
        .withState(state)
        .call(mockedSaga)
        // TODO: how to test that onlyFlow is called again
        .run()
    );
  });

  it('does not call the passed saga but calls the waitFor saga when the selector value is falsy', () => {
    return (
      expectSaga(
        onlyFlow,
        selectAuthenticated,
        initialState.authenticated,
        mockedSaga,
      )
        .withState(initialState)
        .withReducer(reducer)
        .call(waitFor, selectAuthenticated, initialState.authenticated)
        .dispatch({ type: setAuthenticated, payload: { authenticated: true } })
        .call(mockedSaga)
        // TODO: how to test that onlyFlow is called
        .run()
    );
  });
});
