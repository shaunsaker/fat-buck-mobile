import React from 'react';
import { Bot } from './Bot';
import { mountComponent } from '../../testUtils/mountComponent';

describe('Bot', () => {
  it('renders', () => {
    mountComponent(<Bot />);
  });
});
