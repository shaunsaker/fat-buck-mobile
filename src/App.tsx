import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SideMenu } from './components/SideMenu';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Router } from './Router';
import { colors } from './colors';
import { ErrorBoundary } from './components/ErrorBoundary';

const App = () => {
  // useEffect(() => {
  //   persistor.purge();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor={colors.black} />
        <SideMenu>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </SideMenu>
      </PersistGate>
    </Provider>
  );
};

export default App;
