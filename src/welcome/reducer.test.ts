import { welcomeReducer, initialState } from './reducer';
import { setHasSeenWelcome } from './actions';

describe('welcome reducer', () => {
  it('sets hasSeenWelcome correctly', () => {
    const nextState = welcomeReducer(initialState, setHasSeenWelcome(true));

    expect(nextState.hasSeenWelcome).toEqual(true);
  });
});
