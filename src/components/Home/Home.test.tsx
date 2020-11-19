import React from 'react';
import { Home } from '.';
import { mountComponent } from '../../testUtils/mountComponent';

describe('Home', () => {
  it('renders', () => {
    mountComponent(<Home />);
  });
});
