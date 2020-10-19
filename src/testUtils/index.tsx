import React from 'react';
import { render } from '@testing-library/react-native';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApplicationState, initialState, rootReducer } from '../store/reducers';

export const mountComponent = (
  component: ReactNode,
  state: ApplicationState = initialState,
) => {
  const store = createStore(rootReducer, state);
  const spy = jest.spyOn(store, 'dispatch');

  const wrappedComponent = <Provider store={store}>{component}</Provider>;
  const { rerender, ...stuff } = render(wrappedComponent);

  const customRerender = () => {
    // pass a custom rerender that just renders itself again
    // so that we don't need to pass in Provider and store again
    rerender(wrappedComponent);
  };

  return { ...stuff, rerender: customRerender, store, spy };
};
