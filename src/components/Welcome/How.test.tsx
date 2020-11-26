import React from 'react';
import { How } from './How';
import { mountComponent } from '../../testUtils/mountComponent';

describe('How', () => {
  it('renders', () => {
    mountComponent(<How />);
  });
});
