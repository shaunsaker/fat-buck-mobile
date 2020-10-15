import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import {
  COPY_ADDRESS_SUCCESS_TEXT,
  COPY_BUTTON_TEST_ID,
  PoolAddressSlide,
} from './PoolAddressSlide';
import { setSliderIndex, showSnackbar } from '../../store/actions';
import { copyTextToClipboard } from '../../store/clipboard/actions';
import { POOL_ADDRESS } from '../../config';
import { Sliders } from '../../store/sliders/models';
import { slides } from './slides';

describe('CountrySelector', () => {
  const mountComponent = () => {
    const mockStore = store;
    store.dispatch = jest.fn();

    const component = (
      <Provider store={mockStore}>
        <PoolAddressSlide />
      </Provider>
    );

    return render(component);
  };

  it('copies text to the clipboard on copy press', () => {
    const { getByTestId } = mountComponent();

    fireEvent.press(getByTestId(COPY_BUTTON_TEST_ID));

    expect(store.dispatch).toHaveBeenCalledWith(
      copyTextToClipboard(POOL_ADDRESS),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      showSnackbar(COPY_ADDRESS_SUCCESS_TEXT),
    );
  });
});
