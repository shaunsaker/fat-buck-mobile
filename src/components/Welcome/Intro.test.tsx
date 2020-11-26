import React from 'react';
import { Intro } from './Intro';
import { mountComponent } from '../../testUtils/mountComponent';

describe('Intro', () => {
  it('renders', () => {
    mountComponent(<Intro />);
  });
});
