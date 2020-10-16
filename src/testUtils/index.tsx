import React from 'react';
import { render } from '@testing-library/react-native';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApplicationState, initialState, rootReducer } from '../store/reducers';

export const mountComponent = (
  component: ReactNode,
  state: ApplicationState = initialState,
  mocksDispatch: boolean = false,
) => {
  const store = createStore(rootReducer, state);

  if (mocksDispatch) {
    // don't actually update the store
    // just mock dispatch so that we can assert that it was called
    store.dispatch = jest.fn();
  }

  const wrappedComponent = <Provider store={store}>{component}</Provider>;
  const { rerender, ...stuff } = render(wrappedComponent);

  const customRerender = () => {
    // pass a custom rerender that just renders itself again
    // so that we don't need to pass in Provider and store again
    rerender(wrappedComponent);
  };

  return { ...stuff, rerender: customRerender, store };
};
