import React from 'react';
import { Fees } from './Fees';
import { mountComponent } from '../../testUtils/mountComponent';

describe('Fees', () => {
  it('renders', () => {
    mountComponent(<Fees />);
  });
});
