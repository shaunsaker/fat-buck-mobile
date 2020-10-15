import { setSliderIndex } from './actions';
import { Sliders } from './models';
import { slidersReducer, initialState } from './reducer';

describe('sliders reducer', () => {
  it('sets the slider index', () => {
    const nextIndex = 1;
    const nextState = slidersReducer(
      initialState,
      setSliderIndex(Sliders.deposit, nextIndex),
    );

    expect(nextState.deposit).toEqual(nextIndex);
  });
});
