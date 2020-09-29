import { setCountryName } from './actions';
import { countryReducer, initialState } from './reducer';

describe('country reducer', () => {
  it('sets country name correctly', () => {
    const countryName = 'Australia';
    const nextState = countryReducer(initialState, setCountryName(countryName));

    expect(nextState.countryName).toEqual(countryName);
  });
});
