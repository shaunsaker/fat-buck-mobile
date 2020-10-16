import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { SelectWalletSlide } from './SelectWalletSlide';

describe('SelectWalletSlide', () => {
  const mountComponent = () => {
    const mockStore = store;
    store.dispatch = jest.fn();

    const component = (
      <Provider store={mockStore}>
        <SelectWalletSlide />
      </Provider>
    );

    return render(component);
  };

  it('renders', () => {
    mountComponent();
  });
});
