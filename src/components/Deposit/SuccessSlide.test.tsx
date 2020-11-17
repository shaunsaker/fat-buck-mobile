import React from 'react';
import { mountComponent } from '../../testUtils/mountComponent';
import { SuccessSlide } from './SuccessSlide';

describe('SuccessSlide', () => {
  it('renders', () => {
    mountComponent(<SuccessSlide />);
  });
});
