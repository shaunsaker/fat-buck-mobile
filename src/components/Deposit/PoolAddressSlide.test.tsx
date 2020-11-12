import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  COPY_ADDRESS_SUCCESS_TEXT,
  COPY_BUTTON_TEST_ID,
  PoolAddressSlide,
} from './PoolAddressSlide';
import { showSnackbar } from '../../store/actions';
import { copyTextToClipboard } from '../../store/clipboard/actions';
import { POOL_ADDRESS } from '../../config';
import { mountComponent } from '../../testUtils/mountComponent';

describe('PoolAddressSlide', () => {
  it('copies text to the clipboard on copy press', () => {
    const { getByTestId, spy } = mountComponent(
      <PoolAddressSlide />,
      undefined,
    );

    fireEvent.press(getByTestId(COPY_BUTTON_TEST_ID));

    expect(spy).toHaveBeenCalledWith(copyTextToClipboard(POOL_ADDRESS));
    expect(spy).toHaveBeenCalledWith(showSnackbar(COPY_ADDRESS_SUCCESS_TEXT));
  });
});
