import React from 'react';
import { SelectWalletSlide } from './SelectWalletSlide';
import { mountComponent } from '../../testUtils';

describe('SelectWalletSlide', () => {
  it('renders', () => {
    mountComponent(<SelectWalletSlide />);
  });
});
