import React from 'react';
import { mountComponent } from '../../testUtils/mountComponent';
import { SelectWalletSlide } from './SelectWalletSlide';

describe('SelectWalletSlide', () => {
  it('renders', () => {
    mountComponent(<SelectWalletSlide />);
  });
});
