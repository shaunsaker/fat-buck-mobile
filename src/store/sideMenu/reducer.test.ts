import { sideMenuReducer, initialState } from './reducer';
import { setSideMenuIsOpen } from './actions';

describe('sideMenu reducer', () => {
  it('sets isOpen correctly', () => {
    const nextState = sideMenuReducer(initialState, setSideMenuIsOpen(true));

    expect(nextState.isOpen).toEqual(true);
  });
});
